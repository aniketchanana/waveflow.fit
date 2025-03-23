import { Box, BoxProps } from '@mui/material';

const DrawerContent = ({
  children,
  containerProps = {},
}: {
  containerProps?: BoxProps;
  children: React.ReactNode[] | React.ReactNode;
}) => {
  return (
    <Box height='86%' {...containerProps}>
      {children}
    </Box>
  );
};

export default DrawerContent;
