import { IconButton } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_MANAGER_ENDPOINTS } from '@/common/apiEndpoints';
import { PaginatedData } from '@/context/PaginatedDataContainer';

const DeleteGymCenterMemberRenderer = ({ id }) => {
  const { refetchData } = useContext(PaginatedData);
  const { mutate: deleteGymCenterMember, isPending } = useMutation({
    mutationFn: async (memberId: string) =>
      await api.delete(
        `${MANAGEMENT_MANAGER_ENDPOINTS.GYM_CENTER_MEMBERS_GET_UPDATE_DELETE(memberId)}`
      ),
    onSuccess: refetchData,
  });
  return (
    <IconButton onClick={() => deleteGymCenterMember(id)} loading={isPending}>
      <GridDeleteIcon />
    </IconButton>
  );
};

export default DeleteGymCenterMemberRenderer;
