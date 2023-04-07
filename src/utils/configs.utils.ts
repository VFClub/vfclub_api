// JwtModule.register
export const JwtModuleRegister = {
  privateKey: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
};
