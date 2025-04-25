interface IBasicModelProps {
  id: string;
  metadata: Record<string, any>;
}

interface IUser extends IBasicModelProps {
  name: string;
  email: string;
  google_id: string;
  role: EUserRole;
  image: string;
  jwt: string;
  password: string;
}

interface IHealthProfile extends IBasicModelProps {
  user_id: string;
  blood_pressure?: string;
  allergies?: string;
  weight?: number;
  age?: number;
  height?: number;
  average_sleeping_time?: number;
  eating_preference?: string;
  diabetes?: boolean;
}

interface IInvite extends IBasicModelProps {
  invited_by_id: string; // Trainer id
  invite_to_email: string; // email if of person invite sent to
  invite_status: EInviteStatus;
  is_deleted: boolean;
  invited_by?: IUser;
}

interface IAssociation extends IBasicModelProps {
  trainer_id?: string;
  trainee_id?: string;
  invite_id?: string;
  trainee?: IUser;
  trainer?: IUser;
  invite?: IInvite;
}

interface ITemplate extends IBasicModelProps {
  template_name: string;
  template_type: ETemplateType;
  template: Record<string, any>;
}

interface IManagedCenter extends IBasicModelProps {
  name: string;
  address: string;
}
interface ReducerAction<T = any> {
  payload?: T;
  type?: string;
}

interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  hasNext: boolean;
  limit: number;
  page: number;
}

interface PaginatedRequest<T = any> {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Partial<T>;
  attributes?: Record<string, string[]> | string[];
}

interface IGymCenter extends IBasicModelProps {
  manager_id: string;
  manager?: IUser;
  name: string;
  phone_number: string;
  email: string;
  address: string;
}

type TGymCenterUpdateAbleValues = Pick<
  IGymCenter,
  'address' | 'name' | 'phone_number' | 'email'
>;

interface IGymCenterMember extends IBasicModelProps {
  name: string;
  email: string;
  phone_number: string;
  address?: string;
  start_date?: Date;
  end_date?: Date;
  plan_name?: string;

  gym_center_id: string;
  gym_center?: IGymCenter;

  manager_id: string;
  manager?: IUser;

  is_deleted: boolean;
}

type TGymCenterMember = Pick<
  IGymCenterMember,
  'name' | 'email' | 'address' | 'phone_number' | 'start_date' | 'end_date'
>;
