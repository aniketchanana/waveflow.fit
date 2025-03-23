'use client';

import Box from '@mui/material/Box';

import { MANAGEMENT_TRAINER_ENDPOINTS } from '@/common/apiEndpoints';
import ImageRenderer from '@/components/DataGrid/CellRenderers/ImageRenderer';
import MessagingActionRenderer from '@/components/DataGrid/CellRenderers/MessagingActionRenderer';
import PaymentReminderRenderer from '@/components/DataGrid/CellRenderers/PaymentReminderRenderer';
import PaginatedDataGrid from '@/components/DataGrid/PaginatedDataGrid';
import AddNewTraineePopOver from '@/components/Trainee/AddNewTraineePopOver';
import { ColDef } from '@/types/common';

const columns: ColDef[] = [
  {
    field: 'trainee.image',
    headerName: 'Image',
    width: 120,
    renderCell: ImageRenderer,
    cellRenderParams: { fallbackField: 'trainee.name' },
    sortable: false,
  },
  {
    field: 'trainee.name',
    headerName: 'Name',
  },
  {
    field: 'trainee.email',
    headerName: 'Email',
  },
  {
    field: 'created_at',
    headerName: 'Start date',
    type: 'date',
  },
  {
    field: 'paymentReminder',
    headerName: 'Payment reminder',
    sortable: false,
    renderCell: PaymentReminderRenderer,
    width: 120,
  },
  {
    field: 'actions',
    headerName: 'Messaging',
    sortable: false,
    renderCell: MessagingActionRenderer,
    width: 120,
    cellRenderParams: {
      emailField: 'trainee.email',
      whatsAppField: 'trainee.phone',
    },
  },
];

type TTraineeData = {
  id: string;
  trainee: { name: string; image: string; email: string };
};

const Trainees = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
      width='100%'
    >
      <PaginatedDataGrid<TTraineeData>
        columns={columns}
        searchKey='trainee.name'
        dataEndpoint={MANAGEMENT_TRAINER_ENDPOINTS.GET_ALL_ASSOCIATION}
        actions={<AddNewTraineePopOver />}
      />
    </Box>
  );
};

export default Trainees;
