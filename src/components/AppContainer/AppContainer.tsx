'use client';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import FloatingSidebar from '@/components/AppContainer/FloatingSidebar';
import FloatingTopBar from '@/components/AppContainer/FloatingTopBar';

type TAppContainer = { children: React.ReactNode };

/**
 * App container contains the sidebar and the top bar required in app shell
 */
const AppContainer = ({ children }: TAppContainer) => {
  const theme = useTheme();

  return (
    <Box
      height='100%'
      display='flex'
      width='100%'
      bgcolor={theme.palette.background.main}
    >
      <Box display={{ xs: 'none', sm: 'flex' }} alignItems='center'>
        <FloatingSidebar />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        width='100%'
        minWidth={{
          xs: '100%',
          sm: `calc(100% - ${theme.custom.leftPanelWidthExpanded})`,
        }}
        maxWidth={{
          xs: '100%',
          sm: `calc(100% - ${theme.custom.leftPanelWidthMinimized})`,
        }}
      >
        <Box height={theme.custom.headerHeight}>
          <FloatingTopBar />
        </Box>
        <Box
          height={`calc(100% - ${theme.custom.headerHeight})`}
          p='1rem'
          sx={{ overflowY: 'auto' }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppContainer;
