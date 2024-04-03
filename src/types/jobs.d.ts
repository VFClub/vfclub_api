export interface IConfirmationCodeJobProps {
  email: string;
  code: string;
  type: 'emailConfirmation' | 'passwordConfirmation';
}
