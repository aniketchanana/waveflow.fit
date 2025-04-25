import { useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@/common/api.utils';
import { ESortOrder, PAGINATION } from '@/common/constants';
import useToast, { EToastType } from '@/components/Toast/useToast';
import useDebounceInput from '@/hooks/useDebounceInput';

export type GetPaginatedDataProps = {
  dataEndpoint: string;
  extraFilters?: Record<string, any>;
  isEnabled?: boolean;
  searchKey?: string;
  initLimit?: number;
  initPageNum?: number;
  isInfiniteScroll?: boolean;
};
const useFetchPaginatedData = <T extends { id: string }>({
  dataEndpoint,
  isEnabled = true,
  extraFilters,
  searchKey = '',
  initLimit = PAGINATION.DEFAULT_LIMIT,
  initPageNum = PAGINATION.DEFAULT_PAGE_NUM,
  isInfiniteScroll = false,
}: GetPaginatedDataProps) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState(true);
  const [currLimit, setCurrLimit] = useState(initLimit);
  const [currPage, setCurrPage] = useState(initPageNum);
  const [isRefetch, setIsRefetch] = useState(false);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [sortBy, setSortBy] = useState<null | string>(null);
  const [sortOrder, setSortOrder] = useState<null | ESortOrder>(null);
  const { searchText, setInputVal, inputVal } = useDebounceInput();
  const { showToast } = useToast();
  const filterPayload = useMemo(() => {
    const allFilters = {
      ...(typeof extraFilters === 'object' &&
      Object.keys(extraFilters).length > 0
        ? extraFilters
        : {}),
      ...(searchText ? { [searchKey]: searchText } : {}),
    };
    return {
      ...(sortBy ? { sortBy } : {}),
      ...(sortOrder ? { sortOrder } : {}),
      ...(Object.keys(allFilters).length > 0
        ? {
            filters: {
              ...allFilters,
            },
          }
        : {}),
    };
  }, [extraFilters, searchKey, searchText, sortBy, sortOrder]);
  const [dataFilterPayload, setDataFilterPayload] = useState(filterPayload);

  const fetchData = useCallback(async () => {
    try {
      if (!isEnabled) {
        setIsLoading(false);
        setIsError(false);
        setData([]);
        return;
      }
      setIsLoading(true);
      setIsError(false);

      const response = (await api.post<PaginatedRequest, PaginatedResponse<T>>(
        dataEndpoint,
        {
          limit: currLimit,
          page: currPage,
          ...dataFilterPayload,
        }
      )) as PaginatedResponse<T>;
      if (isInfiniteScroll) {
        setData((prevData) => {
          const updatedData = [...prevData, ...response.data];
          return updatedData;
        });
      } else {
        setData(response.data);
      }
      setTotalRowCount(response.total);
      setHasNext(response.hasNext);
    } catch (e: any) {
      setIsError(true);
      if (!isInfiniteScroll) {
        setData([]);
      }
      showToast({
        severity: EToastType.ERROR,
        message: e.message || 'Something went wrong, Unable to get data',
      });
    } finally {
      setIsLoading(false);
      setIsRefetch(false);
    }
  }, [
    currLimit,
    currPage,
    dataEndpoint,
    dataFilterPayload,
    isEnabled,
    isInfiniteScroll,
    showToast,
  ]);

  const resetState = () => {
    setCurrPage(PAGINATION.DEFAULT_PAGE_NUM);
    setData([]);
    setIsLoading(true);
    setIsError(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isRefetch) {
      fetchData();
      setIsRefetch(false);
    }
  }, [fetchData, isRefetch]);

  useEffect(() => {
    setDataFilterPayload(filterPayload);
    // If filter changes then we are restarting the fetch & setting things back to original state
    resetState();
  }, [filterPayload, isInfiniteScroll]);

  return {
    fetchData,
    isLoading,
    isError,
    data,
    setIsRefetch: (v) => {
      setIsRefetch(v);
      resetState();
    },
    inputVal,
    setInputVal,
    totalRowCount,
    currLimit,
    setCurrLimit,
    currPage,
    setCurrPage,
    setSortBy,
    setSortOrder,
    hasNext,
  };
};

export default useFetchPaginatedData;
