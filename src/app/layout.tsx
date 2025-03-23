import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';

import NavigationLoader from '@/components/NavigationLoader/NavigationLoader';
import MaxScreenSizeRestrictOverlay from '@/components/StyledComponents/MaxScreenSizeRestrictOverlay';
import ToastProvider from '@/components/Toast/ToastProvider';
import theme from '@/theme';

import './globals.css';

export const metadata: Metadata = {
  title: 'Gym manager',
  description:
    'Gym manager application, helps you to manage you daily gym activities',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body>
        <NavigationLoader>
          <ToastProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
          </ToastProvider>
        </NavigationLoader>
        <MaxScreenSizeRestrictOverlay />
      </body>
    </html>
  );
};
export default RootLayout;
