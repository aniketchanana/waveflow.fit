'use client';

import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

const NavigationLoader = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height='4px'
      color='#587AB5'
      options={{ showSpinner: false }}
    >
      {children}
    </ProgressProvider>
  );
};

export default NavigationLoader;
