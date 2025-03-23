import Help from '@mui/icons-material/Help';
import { Tooltip } from '@mui/material';

const HelpIconWithMessage = ({ message }: { message: string }) => {
  return (
    <Tooltip title={message} arrow placement='top'>
      <Help sx={{ cursor: 'pointer', fontSize: '1.25rem' }} />
    </Tooltip>
  );
};

export default HelpIconWithMessage;
