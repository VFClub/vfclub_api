export interface IPayloadProps {
  id: string;
  email: string;
  type: string;
}

// mail job
export interface ISendMailProps {
  email: string;
  code: string;
  type: 'resetPassword' | 'accountActivation';
}
