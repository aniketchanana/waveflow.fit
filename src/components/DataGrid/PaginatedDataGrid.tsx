'use client';

import { CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { get, upperCase } from 'lodash';
import { useMemo, useState } from 'react';

import {
  ESortOrder,
  PAGINATION,
  STANDARD_DATE_FORMAT,
} from '@/common/constants';
import CenterAlign from '@/components/StyledComponents/CenterAlign';
import NoResultFound from '@/components/StyledComponents/NoResultFound';
import { PaginatedDataContainer } from '@/context/PaginatedDataContainer';
import useFetchPaginatedData, {
  GetPaginatedDataProps,
} from '@/hooks/useFetchPaginatedData';

export enum EColType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

type Props<T extends { id: string }> = {
  columns: GridColDef[];
  getRowId?: (item: T) => string | number;
  checkboxSelection?: boolean;
  disableColumnMenu?: boolean;
  actions?:
    | React.ReactNode
    | (({
        refetchData,
        setCurrPage,
      }: {
        refetchData: () => void;
        setCurrPage: (v: number) => void;
      }) => React.ReactNode);
  searchPlaceholder?: string;
} & GetPaginatedDataProps;

const dateCols = ['date', 'dateTime'];

const PaginatedDataGrid = <T extends { id: string }>({
  columns,
  dataEndpoint,
  getRowId,
  checkboxSelection = false,
  disableColumnMenu = true,
  searchKey = '',
  searchPlaceholder = 'Search...',
  actions = null,
  isEnabled = true,
  extraFilters,
}: Props<T>) => {
  const {
    data,
    isLoading,
    setIsRefetch,
    inputVal,
    setInputVal,
    totalRowCount,
    setCurrLimit,
    setCurrPage,
    setSortBy,
    setSortOrder,
    currLimit,
    currPage,
  } = useFetchPaginatedData<T>({
    dataEndpoint,
    isEnabled,
    extraFilters,
    searchKey,
  });
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
            return format(value, STANDARD_DATE_FORMAT);
          }
          return value;
        },
      };
      return updatedCol;
    });
  }, [columns, disableColumnMenu]);

  const refetchData = () => {
    setCurrPage(PAGINATION.DEFAULT_PAGE_NUM);
    setIsRefetch(true);
  };

  return (
    <PaginatedDataContainer
      refetchData={refetchData}
      searchKey={searchKey}
      searchPlaceholder={searchPlaceholder}
      inputVal={inputVal}
      setInputVal={setInputVal}
      actions={actions}
    >
      {!isGridReady && (
        <CenterAlign flexDirection='column' gap={1}>
          <CircularProgress />
          <Typography>Setting up things for you...</Typography>
        </CenterAlign>
      )}
      <DataGrid
        rows={data}
        columns={memoizedColumns}
        getRowId={getRowId}
        paginationModel={{ pageSize: currLimit, page: currPage - 1 }}
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
        loading={isLoading}
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
          '& .MuiDataGrid-cell': {
            fontSize: '0.875rem',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontSize: '0.875rem',
          },
        }}
        onStateChange={() => setIsGridReady(true)}
      />
    </PaginatedDataContainer>
  );
};

export default PaginatedDataGrid;
