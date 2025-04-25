'use client';
import { PeopleAlt } from '@mui/icons-material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import WindowIcon from '@mui/icons-material/Window';
import {
  Badge,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext, useMemo, useState } from 'react';

import { MANAGEMENT_MANAGER_ENDPOINTS } from '@/common/apiEndpoints';
import { isMobileScreen } from '@/common/app.utils';
import DeleteGymCenterMemberRenderer from '@/components/DataGrid/CellRenderers/DeleteGymCenterMemberRenderer';
import EditGymCenterMemberRenderer from '@/components/DataGrid/CellRenderers/EditGymCenterMemberRenderer';
import PaginatedDataGrid from '@/components/DataGrid/PaginatedDataGrid';
import DynamicRenderer from '@/components/DynamicRenderer/DynamicRenderer';
import InfiniteScrollList from '@/components/InfiniteScrollList/InfiniteScrollList';
import GymMemberCard, {
  TMembersData,
} from '@/components/Members/GymMemberCard';
import GymMemberDrawer from '@/components/Members/GymMemberDrawer';
import HStack from '@/components/StyledComponents/HStack';
import { GymCenterCtx } from '@/context/GymCenterProvider';
import { ColDef } from '@/types/common';

const columns: ColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  {
    field: 'address',
    headerName: 'Address',
  },
  {
    field: 'phone_number',
    headerName: 'Phone Number',
  },
  {
    field: 'start_date',
    headerName: 'Start Date',
    type: 'date',
  },
  {
    field: 'end_date',
    headerName: 'End Date',
    type: 'date',
  },
  {
    field: 'edit-action',
    headerName: 'Edit details',
    sortable: false,
    renderCell: EditGymCenterMemberRenderer,
    width: 100,
  },
  {
    field: 'delete-actions',
    headerName: 'Delete',
    sortable: false,
    renderCell: DeleteGymCenterMemberRenderer,
    width: 100,
  },
];

enum EViewType {
  GRID_VIEW = 'GRID_VIEW',
  LIST_VIEW = 'LIST_VIEW',
}

const PAGE_HEADER_HEIGHT = 3;

const Members = () => {
  const [viewType, setViewType] = useState(
    isMobileScreen() ? EViewType.LIST_VIEW : EViewType.GRID_VIEW
  );
  const { gymCenterDetails, isGymCenterLoading, isGymCenterLoadingErr } =
    useContext(GymCenterCtx);
  const noGymCenter = !gymCenterDetails?.id;
  const [filterByExpiringSoon, setFilterByExpiringSoon] = useState(false);
  const extraFilters = useMemo(
    () => (filterByExpiringSoon ? { filterByExpiringSoon } : {}),
    [filterByExpiringSoon]
  );
  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: EViewType
  ) => {
    if (newView) {
      setViewType(newView);
    }
  };
  const renderActions = ({ refetchData }) => {
    return (
      <HStack width='100%' justifyContent='space-between' paddingLeft={1}>
        <Tooltip
          placement='top'
          title={
            !filterByExpiringSoon
              ? 'This will filter all members who are either expired or expiring in next 7 days'
              : ''
          }
        >
          <Badge
            color='secondary'
            badgeContent={filterByExpiringSoon ? ' ' : null}
          >
            <Button
              disabled={noGymCenter}
              variant='outlined'
              onClick={() => {
                setFilterByExpiringSoon(!filterByExpiringSoon);
              }}
            >
              {filterByExpiringSoon ? 'Show all' : 'Ending soon'}
            </Button>
          </Badge>
        </Tooltip>
        <GymMemberDrawer refetchData={refetchData} />
      </HStack>
    );
  };

  return (
    <DynamicRenderer
      isLoading={isGymCenterLoading}
      isError={isGymCenterLoadingErr}
    >
      <Box
        display='flex'
        alignItems='center'
        height='100%'
        width='100%'
        flexDirection='column'
        gap={0.5}
        py={1}
      >
        <HStack
          width='100%'
          height={`${PAGE_HEADER_HEIGHT}rem`}
          alignItems='center'
          justifyContent='space-between'
        >
          <HStack gap={0.5} alignItems='center'>
            <Typography variant='h6'>Members</Typography>
            <PeopleAlt />
          </HStack>
          <ToggleButtonGroup
            value={viewType}
            exclusive
            onChange={handleViewChange}
            aria-label='List view'
          >
            <ToggleButton value={EViewType.LIST_VIEW} aria-label='centered'>
              <WindowIcon />
            </ToggleButton>
            <ToggleButton value={EViewType.GRID_VIEW} aria-label='Grid view'>
              <TableRowsIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </HStack>
        <HStack height={`calc(100% - ${PAGE_HEADER_HEIGHT}rem)`}>
          {viewType === EViewType.LIST_VIEW && (
            <InfiniteScrollList<TMembersData>
              searchKey='name'
              searchPlaceholder='Search by name'
              dataEndpoint={MANAGEMENT_MANAGER_ENDPOINTS.GET_GYM_CENTER_MEMBERS}
              actions={renderActions}
              isEnabled={Boolean(gymCenterDetails?.id)}
              extraFilters={extraFilters}
              ContentCard={GymMemberCard}
            />
          )}
          {viewType === EViewType.GRID_VIEW && (
            <PaginatedDataGrid<TMembersData>
              columns={columns}
              searchKey='name'
              searchPlaceholder='Search by name'
              dataEndpoint={MANAGEMENT_MANAGER_ENDPOINTS.GET_GYM_CENTER_MEMBERS}
              actions={renderActions}
              isEnabled={Boolean(gymCenterDetails?.id)}
              extraFilters={extraFilters}
            />
          )}
        </HStack>
      </Box>
    </DynamicRenderer>
  );
};

export default Members;
