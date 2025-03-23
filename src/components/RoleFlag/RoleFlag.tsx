'use client';
import { EUserRole } from '@/common/constants';
import useSession from '@/components/SessionProvider/useSession';

const RoleFlag = ({
  children,
  allowedFor,
  fallback = null,
}: {
  children: React.ReactNode;
  allowedFor?: EUserRole;
  fallback?: React.ReactNode;
}) => {
  const { session } = useSession();
  if (!session?.role) {
    return <>Session does't exit</>;
  }

  // Allowed for specific role
  if (!allowedFor || session.role === allowedFor) {
    return children;
  }

  // Fallback if role doesn't match up
  return fallback;
};

export default RoleFlag;
