import { Grid2 as Grid } from '@mui/material';

import AcceptInvite from '@/components/Dashboard/Widgets/TraineeAssociationWidget/AcceptInvite';
import SelectedAssociation from '@/components/Dashboard/Widgets/TraineeAssociationWidget/SelectedAssociation';

const TraineeAssociationWidget = () => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 4 }} height='fit-content'>
        <SelectedAssociation />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }} height='fit-content'>
        <AcceptInvite />
      </Grid>
    </Grid>
  );
};

export default TraineeAssociationWidget;
