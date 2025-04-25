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

export const TEMPLATE_CREATOR_ENDPOINTS = Object.freeze({
  CREATE_TEMPLATE: '/api/template/create',
  GET_ALL_TEMPLATES: '/api/template/get-all',
  GET_TEMPLATE_BY_ID: (templateId = ':templateId') =>
    `/api/template/get-by-id/${templateId}`,
  UPDATE_TEMPLATE: (templateId = ':templateId') =>
    `/api/template/update/${templateId}`,
  DELETE_TEMPLATE: (templateId = ':templateId') =>
    `/api/template/delete/${templateId}`,
});

export const MANAGEMENT_MANAGER_ENDPOINTS = Object.freeze({
  CREATE_GYM_CENTER: '/api/management/manager/create-gym-center',
  UPDATE_GYM_CENTER: (centerId = ':centerId') =>
    `/api/management/manager/update-gym-center/${centerId}`,
  GET_GYM_CENTER: '/api/management/manager/get-gym-center',

  GYM_CENTER_MEMBER: '/api/management/manager/members',
  GET_GYM_CENTER_MEMBERS: '/api/management/manager/get-members',
  GYM_CENTER_MEMBERS_GET_UPDATE_DELETE: (memberId = ':memberId') =>
    `/api/management/manager/members/${memberId}`,
});
