import { Box, Typography } from '@mui/material';

import AddNewTraineeForm from '@/components/Dashboard/AddNewTraineeForm';
import SectionContainer from '@/components/StyledComponents/SectionContainer';

const AddNewTrainee = () => {
  return (
    <SectionContainer
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        gap={0.5}
        justifyContent='center'
        height='100%'
        width='100%'
      >
        <Typography variant='h6'>Add trainee</Typography>
        <AddNewTraineeForm />
      </Box>
    </SectionContainer>
  );
};

export default AddNewTrainee;
