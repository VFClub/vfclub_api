// import { faker } from '@faker-js/faker';
// import { BullModule } from '@nestjs/bull';
// import { INestApplication } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Test, TestingModule } from '@nestjs/testing';
// import { randomUUID } from 'crypto';
// import * as request from 'supertest';

// // controllers
// import { AuthController } from './auth.controller';

// // services
// import { UserSearchService } from '@/SearchDatabaseServices/user.service';
// import { ConfirmationCodeService } from '@/jobs/send-email/confirmation-code/confirmation-code-service.job';
// import { PrismaService } from '@/prisma/prisma.service';
// import { AuthService } from './auth.service';

// // utils
// import { BullModuleRegisterConfirmationCodeQueue } from '@/utils/config.util';
// import { generateConfirmationCode } from '@/utils/hash.util';

// // enums
// import { USER_TYPE } from '@/enums/user-type.enum';

// // dtos
// import { CreateUserDto } from './dtos/create-user.dto';

// describe('/Auth', () => {
//   let app: INestApplication;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         BullModule.registerQueue(BullModuleRegisterConfirmationCodeQueue),
//       ],
//       controllers: [AuthController],
//       providers: [
//         AuthService,
//         PrismaService,
//         UserSearchService,
//         JwtService,
//         ConfirmationCodeService,
//       ],
//     }).compile();

//     app = module.createNestApplication();
//     await app.init();

//     authService = module.get<AuthService>(AuthService);
//   });

//   it('/POST auth', async () => {
//     const data = {
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//     };

//     const expectedResponse = {
//       access_token: randomUUID(),
//     };

//     jest
//       .spyOn(authService, 'login')
//       .mockImplementation(() => Promise.resolve(expectedResponse));

//     const result = await authService.login(data);

//     expect(result).toEqual(expectedResponse);
//   });

//   it('/POST register', () => {
//     const data: CreateUserDto = {
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//       type: USER_TYPE.ADMIN,
//     };

//     jest.spyOn(authService, 'register').mockImplementation(() =>
//       Promise.resolve({
//         user_id: 1,
//         message: 'User created successfully',
//       }),
//     );
//     return request(app.getHttpServer())
//       .post('/auth/register')
//       .send(data)
//       .expect(201);
//   });

//   it('/POST activate-account', () => {
//     const data = {
//       email: faker.internet.email(),
//       code: generateConfirmationCode(),
//     };

//     jest.spyOn(authService, 'activateAccount').mockImplementation(() =>
//       Promise.resolve({
//         message: 'Account activated successfully',
//       }),
//     );

//     return request(app.getHttpServer())
//       .post('/auth/activate-account')
//       .send(data)
//       .expect(201);
//   });

//   it('/POST resend-activate-account-code', () => {
//     const data = {
//       email: faker.internet.email(),
//     };

//     jest
//       .spyOn(authService, 'resendActivateAccountCode')
//       .mockImplementation(() =>
//         Promise.resolve({
//           message: 'Code sent successfully',
//         }),
//       );

//     return request(app.getHttpServer())
//       .post('/auth/resend-activate-account-code')
//       .send(data)
//       .expect(201);
//   });

//   it('/POST request-recovery-password', () => {
//     const data = {
//       email: faker.internet.email(),
//     };

//     jest.spyOn(authService, 'requestRecoveryPassword').mockImplementation(() =>
//       Promise.resolve({
//         message: 'Code sent successfully',
//       }),
//     );

//     return request(app.getHttpServer())
//       .post('/auth/request-recovery-password')
//       .send(data)
//       .expect(201);
//   });

//   it('/POST recovery-password', () => {
//     const data = {
//       email: faker.internet.email(),
//       code: generateConfirmationCode(),
//       password: faker.internet.password(),
//     };

//     jest.spyOn(authService, 'recoveryPassword').mockImplementation(() =>
//       Promise.resolve({
//         message: 'Password recovered successfully',
//       }),
//     );

//     return request(app.getHttpServer())
//       .post('/auth/recovery-password')
//       .send(data)
//       .expect(201);
//   });
// });
