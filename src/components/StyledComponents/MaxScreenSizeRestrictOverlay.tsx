'use client';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CenterAlign from '@/components/StyledComponents/CenterAlign';

const MaxScreenSizeRestrictOverlay = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(410));

  if (!isSmallScreen) return null;

  return (
    <CenterAlign
      flexDirection='column'
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 9999,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant='h5' fontWeight='bold'>
        Screen Too Small
      </Typography>
      <Typography variant='body1' mt={1}>
        Please use a larger screen (≥ 410px) to access this app.
      </Typography>
    </CenterAlign>
  );
};

export default MaxScreenSizeRestrictOverlay;
