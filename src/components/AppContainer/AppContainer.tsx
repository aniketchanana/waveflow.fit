'use client';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import FloatingTopBar from '@/components/AppContainer/FloatingTopBar';
import FloatingSidebar from '@/components/AppContainer/Sidebar/FloatingSidebar';
import HorizontalNavBar from '@/components/AppContainer/Sidebar/HorizontalNavBar';

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
      <Box display={{ xs: 'none', md: 'flex' }} alignItems='center'>
        <FloatingSidebar />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        width='100%'
        minWidth={{
          xs: '100%',
          md: `calc(100% - ${theme.custom.leftPanelWidthExpanded})`,
        }}
        maxWidth={{
          xs: '100%',
          md: `calc(100% - ${theme.custom.leftPanelWidthMinimized})`,
        }}
      >
        <Box height={theme.custom.headerHeight}>
          <FloatingTopBar />
        </Box>
        <Box
          height={{
            xs: `calc(100% - ${theme.custom.headerHeight} - ${theme.custom.horizontalNavHeight})`,
            md: `calc(100% - ${theme.custom.headerHeight})`,
          }}
          pr='1rem'
          pl='0.5rem'
          sx={{ overflowY: 'auto' }}
        >
          {children}
        </Box>
        <Box
          display={{ xs: 'flex', md: 'none' }}
          height={theme.custom.horizontalNavHeight}
        >
          <HorizontalNavBar />
        </Box>
      </Box>
    </Box>
  );
};

export default AppContainer;
