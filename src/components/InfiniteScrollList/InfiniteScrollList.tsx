import {
  Box,
  CircularProgress,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import { JSX, useCallback, useEffect, useRef } from 'react';

import { PAGINATION } from '@/common/constants';
import DynamicRenderer from '@/components/DynamicRenderer/DynamicRenderer';
import CenterAlign from '@/components/StyledComponents/CenterAlign';
import { PaginatedDataContainer } from '@/context/PaginatedDataContainer';
import useFetchPaginatedData, {
  GetPaginatedDataProps,
} from '@/hooks/useFetchPaginatedData';

type Props<T> = {
  actions?:
    | React.ReactNode
    | (({ refetchData }: { refetchData: () => void }) => React.ReactNode);
  searchPlaceholder?: string;
  ContentCard: (props: T) => JSX.Element;
} & GetPaginatedDataProps;

const InfiniteScrollList = <T extends { id: string }>({
  dataEndpoint,
  isEnabled = true,
  extraFilters,
  actions = null,
  searchKey = '',
  searchPlaceholder = 'Search...',
  ContentCard,
}: Props<T>) => {
  const {
    hasNext,
    setCurrPage,
    isLoading: loading,
    data: items,
    setIsRefetch,
    setInputVal,
    inputVal,
    isError,
  } = useFetchPaginatedData<T>({
    dataEndpoint,
    extraFilters,
    isEnabled,
    initLimit: PAGINATION.MID_LIMIT,
    isInfiniteScroll: true,
    searchKey,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          setCurrPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasNext, setCurrPage]
  );

  const refetchData = () => {
    setCurrPage(PAGINATION.DEFAULT_PAGE_NUM);
    setIsRefetch(true);
  };

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <PaginatedDataContainer
      refetchData={refetchData}
      searchKey={searchKey}
      searchPlaceholder={searchPlaceholder}
      inputVal={inputVal}
      setInputVal={setInputVal}
      actions={actions}
    >
      <DynamicRenderer
        isNoResultFound={items.length === 0 && !loading}
        isError={isError}
        isLoading={false}
      >
        <Grid container spacing={1} width='100%' sx={{ overflowY: 'auto' }}>
          {items.map((item) => {
            return (
              <Grid
                key={item.id}
                size={{ xs: 12, md: 4, xl: 3 }}
                height='10.5rem'
              >
                <ContentCard {...item} />
              </Grid>
            );
          })}
          <Grid
            size={12}
            ref={lastElementRef}
            style={{
              minHeight: '20px',
              background: 'transparent',
            }}
          >
            {!hasNext && !loading && items.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CenterAlign>
                  <Typography variant='body1'>
                    You've reached the end of list! 🎉
                  </Typography>
                </CenterAlign>
              </Box>
            )}
          </Grid>
          {loading && (
            <Grid size={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 1,
                }}
              >
                <CircularProgress size='1.5rem' />
              </Box>
            </Grid>
          )}
        </Grid>
      </DynamicRenderer>
    </PaginatedDataContainer>
  );
};

export default InfiniteScrollList;
