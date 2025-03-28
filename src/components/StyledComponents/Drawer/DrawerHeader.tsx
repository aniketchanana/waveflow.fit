import { Close } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip, Typography } from '@mui/material';

import HStack from '@/components/StyledComponents/HStack';

const DrawerHeader = ({
  children,
  handleClose,
  isCreatingTemplate = false,
  isViewOnlyMode = false,
}: {
  isCreatingTemplate?: boolean;
  isViewOnlyMode?: boolean;
  children: string;
  handleClose?: () => void;
}) => {
  return (
    <HStack
      height='6%'
      p='1rem 0rem'
      alignItems='center'
      justifyContent='space-between'
    >
      <HStack alignItems='center' gap={1}>
        <Typography variant='h6'>{children}</Typography>
        {isViewOnlyMode && (
          <Tooltip title='View mode'>
            <VisibilityIcon />
          </Tooltip>
        )}
      </HStack>
      {handleClose && (
        <IconButton onClick={handleClose} disabled={isCreatingTemplate}>
          <Close />
        </IconButton>
      )}
    </HStack>
  );
};
export default DrawerHeader;
