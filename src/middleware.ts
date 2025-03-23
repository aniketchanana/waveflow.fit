import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTE_URLS } from '@/common/appUrls';
import { EUserRole } from '@/common/constants';
import { getSession } from '@/components/SessionProvider/auth.utils';

const protectedRoutes: Record<string, string[]> = {
  [ROUTE_URLS.trainees]: [EUserRole.TRAINER],
  [ROUTE_URLS.diet]: [EUserRole.TRAINER],
  [ROUTE_URLS.workout]: [EUserRole.TRAINER],
};

export const middleware = async (req: NextRequest) => {
  const { nextUrl } = req;
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.next(); // Let the app handle it
  }

  const user = await getSession(token); // TODO: optimize this call this call is happening 2 times for because on getSession called in dashboard layout as well
  if (!user) {
    return NextResponse.next(); // let the app handle it
  }
  if (!user?.role) {
    // No matter what route it goes it will always encounter user onboarding so let the app handle this as well
    return NextResponse.next();
  }

  // Role-based access control
  if (
    protectedRoutes[nextUrl.pathname] &&
    !protectedRoutes[nextUrl.pathname].includes(user.role)
  ) {
    return NextResponse.redirect(new URL(ROUTE_URLS.dashboard, req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard/diet', '/dashboard/workout', '/dashboard/trainees'],
};
