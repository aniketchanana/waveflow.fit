import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useContext, useState } from 'react';

import EditUpdateMemberDrawerForm from '@/components/Members/EditUpdateMemberDrawerForm';
import { PaginatedData } from '@/context/PaginatedDataContainer';

const EditGymCenterMemberRenderer = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { refetchData } = useContext(PaginatedData);

  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>
      <EditUpdateMemberDrawerForm
        memberId={props.id}
        isDrawerOpen={isDrawerOpen}
        refetchData={refetchData}
        handleClose={handleClose}
      />
    </>
  );
};

export default EditGymCenterMemberRenderer;
