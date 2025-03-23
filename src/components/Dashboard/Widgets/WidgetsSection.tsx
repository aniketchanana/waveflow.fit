import { Box } from '@mui/material';

import { EUserRole } from '@/common/constants';
import AddNewTraineeWidget from '@/components/Dashboard/Widgets/AddNewTraineeWidget/AddNewTraineeWidget';
import TraineeAssociationWidget from '@/components/Dashboard/Widgets/TraineeAssociationWidget/TraineeAssociationWidget';
import RoleFlag from '@/components/RoleFlag/RoleFlag';

const WidgetsSection = () => {
  return (
    <Box width='100%' height='100%'>
      <RoleFlag allowedFor={EUserRole.TRAINER}>
        <AddNewTraineeWidget />
      </RoleFlag>
      <RoleFlag allowedFor={EUserRole.TRAINEE}>
        <TraineeAssociationWidget />
      </RoleFlag>
    </Box>
  );
};
export default WidgetsSection;
