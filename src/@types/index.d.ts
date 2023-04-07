export interface IPayloadProps {
  id: string;
  email: string;
}

// auth controller
export interface IUserProps {
  id: string | number;
  email: string;
  password: string;
  type: string;
  activation_token: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

// mail job
export interface ISendMailProps {
  email: string;
  code: string;
}
