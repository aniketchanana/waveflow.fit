'use client';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';

import { ROUTE_URLS } from '@/common/appUrls';
import { EUserRole } from '@/common/constants';
import { getSession } from '@/components/SessionProvider/auth.utils';

export type TUserSession = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: EUserRole;
} | null;

export const SessionContext = createContext<{
  session: TUserSession;
  fetchSession: () => void;
}>({
  session: null,
  fetchSession: () => {
    throw new Error('Implement function: fetchSessionFromServer');
  },
});

const SessionProvider = ({
  children,
  serverSession,
}: {
  children: React.ReactNode;
  serverSession?: TUserSession;
}) => {
  const [session, setSession] = useState<TUserSession>(serverSession || null);
  const [isSessionLoading, setIsSessionLoading] = useState(!Boolean(session));
  const router = useRouter();
  const fetchSession = useCallback(async () => {
    try {
      setIsSessionLoading(true);
      const userSessionDetails = await getSession();
      if (!userSessionDetails) {
        throw new Error("Session  doesn't exist");
      }
      setSession(userSessionDetails);
      router.push(ROUTE_URLS.dashboard);
    } catch {
      setSession(null);
      router.push(ROUTE_URLS.root);
    } finally {
      setIsSessionLoading(false);
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      if (session) return;
      fetchSession();
    })();
  }, [fetchSession, session]);

  if (isSessionLoading) {
    return (
      <Box
        height='100%'
        width='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <SessionContext value={{ session, fetchSession }}>
      {children}
    </SessionContext>
  );
};

export default SessionProvider;
