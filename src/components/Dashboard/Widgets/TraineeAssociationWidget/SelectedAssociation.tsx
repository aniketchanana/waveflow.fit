'use client';
import { Avatar, CircularProgress, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';

import CenterAlign from '@/components/StyledComponents/CenterAlign';
import NoResultFound from '@/components/StyledComponents/NoResultFound';
import SectionContainer from '@/components/StyledComponents/SectionContainer';
import { TraineeRelationshipCtx } from '@/context/TraineeRelationship';

const SelectedAssociation = () => {
  const { selectedAssociationId, isAssociationsLoading, associationsById } =
    useContext(TraineeRelationshipCtx);
  const selectedAssociation = useMemo(() => {
    if (selectedAssociationId) {
      return associationsById[selectedAssociationId];
    }
    return null;
  }, [associationsById, selectedAssociationId]);
  const component = useMemo(() => {
    if (isAssociationsLoading)
      return (
        <CenterAlign>
          <CircularProgress />
        </CenterAlign>
      );

    if (!selectedAssociation)
      return (
        <NoResultFound text='You are not associated with any trainers yet' />
      );
    return (
      <CenterAlign flexDirection='column' gap={2}>
        <Typography variant='h2' px={1}>
          Training with
        </Typography>
        <Avatar
          alt={selectedAssociation.trainer?.name}
          src={selectedAssociation.trainer?.image}
          sx={{ width: 150, height: 150, fontSize: '4rem' }}
        />
        <Typography variant='h4'>
          {selectedAssociation.trainer?.name}
        </Typography>
      </CenterAlign>
    );
  }, [isAssociationsLoading, selectedAssociation]);
  return (
    <SectionContainer
      sx={{
        height: '500px',
        px: 1,
      }}
    >
      {component}
    </SectionContainer>
  );
};

export default SelectedAssociation;
