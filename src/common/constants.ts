export enum EUserRole {
  TRAINER = 'TRAINER',
  MANAGER = 'MANAGER',
  TRAINEE = 'TRAINEE',
}
export enum EInviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum PAGINATION {
  DEFAULT_LIMIT = 20,
  DEFAULT_PAGE_NUM = 1,
  MID_LIMIT = 40,
  LARGE_LIMIT = 100,
}

export enum ESortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ETemplateType {
  WORKOUT = 'WORKOUT',
  DIET = 'DIET',
}

export enum EExerciseLoggingType {
  BOOLEAN = 'BOOLEAN',
  WEIGHT_REP_COUNT = 'WEIGHT_REP_COUNT',
  TIME = 'TIME',
  TIME_WEIGHT = 'TIME_WEIGHT',
}

export enum EMealType {
  BREAKFAST = 'BREAKFAST',
  POST_BREAKFAST = 'POST_BREAKFAST',
  LUNCH = 'LUNCH',
  EVENING_SNACKS = 'EVENING_SNACKS',
  DINNER = 'DINNER',
  POST_DINNER = 'POST_DINNER',
  MUNCHING = 'MUNCHING',
}

export const STANDARD_DATE_FORMAT = 'dd MMMM yyyy';
