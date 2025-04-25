'use client';

import Add from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { useContext, useState } from 'react';

import EditUpdateMemberDrawerForm from '@/components/Members/EditUpdateMemberDrawerForm';
import { GymCenterCtx } from '@/context/GymCenterProvider';

const GymMemberDrawer = ({
  memberId,
  refetchData,
}: {
  memberId?: string;
  refetchData: () => void;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { gymCenterDetails } = useContext(GymCenterCtx);

  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };
  const noGymCenter = !gymCenterDetails?.id;
  return (
    <>
      <Button startIcon={<Add />} onClick={handleOpen} disabled={noGymCenter}>
        <Box display={{ xs: 'none', md: 'block' }}>Add new member</Box>
        <Box display={{ xs: 'block', md: 'none' }}>New</Box>
      </Button>

      <EditUpdateMemberDrawerForm
        memberId={memberId}
        isDrawerOpen={isDrawerOpen}
        refetchData={refetchData}
        handleClose={handleClose}
      />
    </>
  );
};

export default GymMemberDrawer;
