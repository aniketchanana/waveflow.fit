'use client';

import { Add } from '@mui/icons-material';
import { Box, Button, Popover } from '@mui/material';
import { useState } from 'react';

import AddNewTraineeForm from '@/components/Dashboard/AddNewTraineeForm';

const AddNewTraineePopOver = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} startIcon={<Add />}>
        Add new Trainee
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Box p={1} minWidth='24.5rem'>
          <AddNewTraineeForm />
        </Box>
      </Popover>
    </>
  );
};

export default AddNewTraineePopOver;
