import { api } from '@/common/api.utils';
import { USER_ENDPOINTS } from '@/common/apiEndpoints';
import { TUserSession } from '@/components/SessionProvider/SessionProvider';

export const getSession = async (token?: string) => {
  try {
    const headers = token ? { token } : {};
    const userSessionDetails = (await api.get(
      USER_ENDPOINTS.GET_USER_SESSION,
      headers as Record<string, string>
    )) as TUserSession;
    return userSessionDetails;
  } catch {
    return null;
  }
};
export const handleLogout = async () => {
  try {
    await api.post(USER_ENDPOINTS.USER_LOGOUT, {});
  } catch (e) {
    throw e;
  }
};
