import { Close } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

import HStack from '@/components/StyledComponents/HStack';

const DrawerHeader = ({
  children,
  handleClose,
}: {
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
      <Typography variant='h6'>{children}</Typography>
      {handleClose && (
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      )}
    </HStack>
  );
};
export default DrawerHeader;
