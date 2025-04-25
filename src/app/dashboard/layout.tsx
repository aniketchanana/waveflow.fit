import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ROUTE_URLS } from '@/common/appUrls';
import { EUserRole } from '@/common/constants';
import AppContainer from '@/components/AppContainer/AppContainer';
import ReactQueryProvider from '@/components/ReactQueryProvider/ReactQueryProvider';
import RoleFlag from '@/components/RoleFlag/RoleFlag';
import { getSession } from '@/components/SessionProvider/auth.utils';
import SessionProvider from '@/components/SessionProvider/SessionProvider';
import UserOnBoarding from '@/components/UserOnBoarding/UserOnBoarding';
import GymCenterProvider from '@/context/GymCenterProvider';

export const metadata: Metadata = {
  title: 'Gym manager',
  description: 'Gym manager application, Dashboard for activity management',
};

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const session = await getSession(token?.value);
  if (!session) {
    redirect(ROUTE_URLS.root);
  }

  // on session has a loading state without session app won't load
  return (
    <ReactQueryProvider>
      <SessionProvider serverSession={session}>
        <UserOnBoarding>
          <RoleFlag
            allowedFor={EUserRole.MANAGER}
            fallback={<AppContainer>{children}</AppContainer>}
          >
            <GymCenterProvider>
              <AppContainer>{children}</AppContainer>
            </GymCenterProvider>
          </RoleFlag>
        </UserOnBoarding>
      </SessionProvider>
    </ReactQueryProvider>
  );
};

export default DashboardLayout;
