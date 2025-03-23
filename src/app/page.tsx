import { GoogleOAuthProvider } from '@react-oauth/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ROUTE_URLS } from '@/common/appUrls';
import { LoginForm } from '@/components/LoginForm';
import { getSession } from '@/components/SessionProvider/auth.utils';

const Root = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const session = await getSession(token?.value);
  if (session) {
    redirect(ROUTE_URLS.dashboard);
  }
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
};

export default Root;
