// JwtModule.register
export const JwtModuleRegister = {
  privateKey: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
};

export const redis = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

// MailerModule.forRoot
export const transport = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
};

export const BullModuleRegisterQueue = {
  name: 'confirmationCode-queue',
};
