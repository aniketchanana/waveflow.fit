'use client';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';

import CenterAlign from '@/components/StyledComponents/CenterAlign';
const PaymentReminderRenderer = () => {
  return (
    <CenterAlign gap={0.5} justifyContent='flex-start'>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
    </CenterAlign>
  );
};

export default PaymentReminderRenderer;
