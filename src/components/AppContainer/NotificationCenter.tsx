import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge } from '@mui/material';

import SectionContainer from '@/components/StyledComponents/SectionContainer';

const NotificationCenter = () => {
  return (
    <Badge badgeContent={2000} color='primary' max={10} overlap='circular'>
      <SectionContainer>
        <NotificationsNoneIcon />
      </SectionContainer>
    </Badge>
  );
};

export default NotificationCenter;
