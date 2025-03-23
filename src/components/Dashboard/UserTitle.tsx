'use client';

import { Typography } from '@mui/material';

import useSession from '@/components/SessionProvider/useSession';

const UserTitle = () => {
  const { session } = useSession();
  return <Typography variant='h1'>Hello {session?.name} 👋</Typography>;
};

export default UserTitle;
