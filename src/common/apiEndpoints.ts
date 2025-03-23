export const USER_ENDPOINTS = Object.freeze({
  GOOGLE_SIGN_IN: '/api/user/google-sign-in',
  GET_USER_SESSION: '/api/user/get-session',
  USER_LOGOUT: '/api/user/logout',
  USER_SAVE_ONBOARDING_DETAILS: '/api/user/onboarding-details',
});

export const MANAGEMENT_TRAINER_ENDPOINTS = Object.freeze({
  SEND_INVITE: '/api/management/trainer/send-invite',
  GET_ALL_PENDING_INVITES: '/api/management/trainer/get-all-invites',
  DELETE_INVITE: '/api/management/trainer/delete-invite/:inviteId',
  GET_ALL_ASSOCIATION: '/api/management/trainer/get-all-association',
});

export const MANAGEMENT_TRAINEE_ENDPOINTS = Object.freeze({
  GET_ALL_INVITES: '/api/management/trainee/get-all-invites',
  GET_ALL_ASSOCIATION: '/api/management/trainee/get-all-association',
  ACCEPT_INVITE: (inviteId: string) =>
    `/api/management/trainee/accept-invite/${inviteId}`,
  REJECT_INVITE: (inviteId: string) =>
    `/api/management/trainee/reject-invite/${inviteId}`,
});
