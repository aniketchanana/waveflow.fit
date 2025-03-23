import { Box } from '@mui/material';

import HStack from '@/components/StyledComponents/HStack';

const DrawerActionButtons = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <HStack
      display='flex'
      gap={0.5}
      height='8%'
      p='1rem 0rem'
      alignItems='center'
    >
      <Box display='flex' gap={0.5}>
        {children}
      </Box>
    </HStack>
  );
};

export default DrawerActionButtons;
