import { Box } from '@mui/material';

import { EUserRole } from '@/common/constants';
import GymManagement from '@/components/Dashboard/GymManagement/GymManagement';
import UserTitle from '@/components/Dashboard/UserTitle';
import RoleFlag from '@/components/RoleFlag/RoleFlag';

const Dashboard = () => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <UserTitle />
      <RoleFlag allowedFor={EUserRole.MANAGER}>
        <GymManagement />
      </RoleFlag>
    </Box>
  );
};

export default Dashboard;
