'use client';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_TRAINEE_ENDPOINTS } from '@/common/apiEndpoints';
import { EInviteStatus } from '@/common/constants';
import CenterAlign from '@/components/StyledComponents/CenterAlign';
import MaxCharTypography from '@/components/StyledComponents/MaxCharTypography';
import NoResultFound from '@/components/StyledComponents/NoResultFound';
import SectionContainer from '@/components/StyledComponents/SectionContainer';
import useToast, { EToastType } from '@/components/Toast/useToast';
import { TraineeRelationshipCtx } from '@/context/TraineeRelationship';

const ActionButton = ({
  status,
  inviteId,
}: {
  status: EInviteStatus;
  inviteId: string;
}) => {
  const [isActionPending, setIsActionPending] = useState(false);
  const { showToast } = useToast();
  const { updateTraineeInviteStatus } = useContext(TraineeRelationshipCtx);

  const handleAction = async (action: 'accept' | 'reject') => {
    try {
      setIsActionPending(true);
      let updatedStatus;
      if (action === 'accept') {
        await api.patch(MANAGEMENT_TRAINEE_ENDPOINTS.ACCEPT_INVITE(inviteId));
        updatedStatus = EInviteStatus.ACCEPTED;
      }
      if (action === 'reject') {
        await api.patch(MANAGEMENT_TRAINEE_ENDPOINTS.REJECT_INVITE(inviteId));
        updatedStatus = EInviteStatus.REJECTED;
      }

      updateTraineeInviteStatus(inviteId, updatedStatus);
    } catch (e: any) {
      showToast({ severity: EToastType.ERROR, message: e.message });
    } finally {
      setIsActionPending(false);
    }
  };
  if (status !== EInviteStatus.PENDING) return null;
  return (
    <Box display='flex' gap={0.5} alignItems='center' marginLeft='auto'>
      <IconButton
        onClick={() => handleAction('accept')}
        disabled={isActionPending}
        size='small'
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        size='small'
        onClick={() => handleAction('reject')}
        disabled={isActionPending}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
const AcceptInvite = () => {
  const { traineeInvites, traineeInvitesById, isTraineeInvitesLoading } =
    useContext(TraineeRelationshipCtx);

  const renderList = () => {
    if (isTraineeInvitesLoading) {
      return (
        <CenterAlign>
          <CircularProgress />
        </CenterAlign>
      );
    }
    if (traineeInvites.length === 0)
      return <NoResultFound text='No invites yet' />;
    return (
      <List sx={{ width: '100%', overflowY: 'auto' }}>
        {traineeInvites.map((id) => {
          const { invite_status, invited_by } = traineeInvitesById[id];
          return (
            <div key={id}>
              <Box
                width='100%'
                display='flex'
                px={0.5}
                py={invite_status === EInviteStatus.PENDING ? 0 : 0.5}
                gap={0.5}
                alignItems='center'
              >
                <Chip label={invite_status} size='small' />
                <MaxCharTypography maxchars={40} variant='body2'>
                  {invited_by?.name} ({invited_by?.email})
                </MaxCharTypography>
                <ActionButton status={invite_status} inviteId={id as string} />
              </Box>
              <Divider />
            </div>
          );
        })}
      </List>
    );
  };
  return (
    <SectionContainer
      sx={{
        height: '500px',
        px: 0,
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        gap={0.5}
        justifyContent='start'
        alignItems='start'
        height='100%'
        position='relative'
      >
        <Typography variant='h6' px={1}>
          Invites
        </Typography>
        {renderList()}
      </Box>
    </SectionContainer>
  );
};

export default AcceptInvite;
