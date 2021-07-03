import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],

  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'Wellooccmnee',
      signOptions: {
        expiresIn: '3d',
      },
    }),
  ],
})
export class AuthModule {}
