'use client';

import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { get, upperCase } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@/common/api.utils';
import { ESortOrder, PAGINATION } from '@/common/constants';
import SearchByText from '@/components/Search/SearchByText';
import CenterAlign from '@/components/StyledComponents/CenterAlign';
import NoResultFound from '@/components/StyledComponents/NoResultFound';
import SectionContainer from '@/components/StyledComponents/SectionContainer';
import useToast, { EToastType } from '@/components/Toast/useToast';
import useDebounceInput from '@/hooks/useDebounceInput';

export enum EColType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}
const initData = {
  data: [],
  isLoading: true,
  isError: false,
};

const dateCols = ['date', 'dateTime'];
type Props<T extends { id: string }> = {
  columns: GridColDef[];
  dataEndpoint: string;
  getRowId?: (item: T) => string | number;
  checkboxSelection?: boolean;
  searchKey?: string;
  disableColumnMenu?: boolean;
  actions?: React.ReactNode;
  searchPlaceholder?: string;
};
const PaginatedDataGrid = <T extends { id: string }>({
  columns,
  dataEndpoint,
  getRowId,
  checkboxSelection = false,
  disableColumnMenu = true,
  searchKey = '',
  actions = null,
  searchPlaceholder = 'Search...',
}: Props<T>) => {
  const [state, setState] = useState<{
    data: T[];
    isLoading: boolean;
    isError: boolean;
  }>(initData);
  const { showToast } = useToast();
  const [currLimit, setCurrLimit] = useState(PAGINATION.DEFAULT_LIMIT);
  const [currPage, setCurrPage] = useState(PAGINATION.DEFAULT_PAGE_NUM);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [sortBy, setSortBy] = useState<null | string>(null);
  const [sortOrder, setSortOrder] = useState<null | ESortOrder>(null);
  const { searchText, setInputVal, inputVal } = useDebounceInput();
  const [isGridReady, setIsGridReady] = useState(false);
  const memoizedColumns = useMemo(() => {
    return columns.map((col) => {
      const updatedCol: GridColDef = {
        ...col,
        ...(Number(col.width) > 0 ? {} : { flex: 1 }),
        disableColumnMenu,
        valueGetter: (_value, row, colDef) => {
          const type = get(colDef, 'type', '');
          const value = get(row, col.field);
          if (dateCols.includes(type)) {
            return new Date(value);
          }
          return value;
        },
        valueFormatter: (_value, row, colDef) => {
          const type = get(colDef, 'type', '');
          const value = get(row, col.field);
          if (dateCols.includes(type)) {
            return format(value, 'dd MMMM yyyy');
          }
          return value;
        },
      };
      return updatedCol;
    });
  }, [columns, disableColumnMenu]);

  const fetchData = useCallback(async () => {
    try {
      setState(initData);
      const response = (await api.post<PaginatedRequest, PaginatedResponse<T>>(
        dataEndpoint,
        {
          limit: currLimit,
          page: currPage,
          ...(sortBy ? { sortBy } : {}),
          ...(sortOrder ? { sortOrder } : {}),
          ...(searchKey && searchText
            ? {
                filters: {
                  [searchKey]: searchText,
                },
              }
            : {}),
        }
      )) as PaginatedResponse<T>;

      setState({ data: response.data, isLoading: false, isError: false });
      setTotalRowCount(response.total);
    } catch (e: any) {
      setState({ data: [], isLoading: false, isError: true });
      showToast({
        severity: EToastType.ERROR,
        message: e.message || 'Something went wrong, Unable to get data',
      });
    }
  }, [
    currLimit,
    currPage,
    dataEndpoint,
    searchKey,
    searchText,
    showToast,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SectionContainer sx={{ py: 1 }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          position: 'relative',
        }}
      >
        <Box width='100%' justifyContent='space-between' display='flex'>
          {searchKey && (
            <SearchByText
              placeholder={searchPlaceholder}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onClearIconClick={() => setInputVal('')}
            />
          )}
          {actions}
        </Box>
        {!isGridReady && (
          <CenterAlign flexDirection='column' gap={1}>
            <CircularProgress />
            <Typography>Setting up things for you...</Typography>
          </CenterAlign>
        )}
        <DataGrid
          rows={state.data}
          columns={memoizedColumns}
          getRowId={getRowId}
          initialState={{
            pagination: {
              paginationModel: { pageSize: currLimit, page: currPage - 1 },
            },
          }}
          onPaginationModelChange={({ pageSize, page }) => {
            setCurrLimit(pageSize);
            setCurrPage(page + 1);
          }}
          onSortModelChange={([model]) => {
            if (model) {
              setSortBy(model.field);
              setSortOrder(upperCase(model.sort as string) as ESortOrder);
            } else {
              setSortBy(null);
              setSortOrder(null);
            }
          }}
          pageSizeOptions={[5, 20, 50, 100]}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick
          rowCount={totalRowCount}
          paginationMode='server'
          loading={state.isLoading}
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
          }}
          slots={{
            noRowsOverlay: () => <NoResultFound text='No results found' />,
            noResultsOverlay: () => <NoResultFound text='No results found' />,
          }}
          sx={{
            zIndex: 1,
            border: 'none',
            minWidth: '100%',
            overflowX: 'auto',
            '& .MuiDataGrid-viewport': {
              minWidth: '100%',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
          }}
          onStateChange={() => setIsGridReady(true)}
        />
      </Box>
    </SectionContainer>
  );
};

export default PaginatedDataGrid;
