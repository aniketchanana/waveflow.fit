'use client';
import Grid from '@mui/material/Grid2';
import { useContext } from 'react';

import GymSetup from '@/components/Dashboard/GymManagement/GymSetup';
import DynamicRenderer from '@/components/DynamicRenderer/DynamicRenderer';
import { GymCenterCtx } from '@/context/GymCenterProvider';

const GymManagement = () => {
  const {
    isGymCenterLoading,
    isGymCenterLoadingErr,
    gymCenterDetails,
    setGymCenterDetails,
  } = useContext(GymCenterCtx);

  return (
    <DynamicRenderer
      isLoading={isGymCenterLoading}
      isError={isGymCenterLoadingErr}
    >
      <Grid container spacing={2}>
        {/* {gymCenterDetails && (
          <Grid size={{ xs: 12, md: gymCenterDetails ? 2 : 0 }}>
            <AttendanceQRCode gymCenterId={gymCenterDetails.id} />
          </Grid>
        )} */}
        <Grid
          size={{
            xs: 12,
            md: 12,
            //  gymCenterDetails ? 10 : 12
          }}
        >
          <GymSetup
            gymCenterDetails={gymCenterDetails}
            setGymCenterDetails={setGymCenterDetails}
          />
        </Grid>
      </Grid>
    </DynamicRenderer>
  );
};

export default GymManagement;
