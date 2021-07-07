import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Wellooccmnee',
      signOptions: {
        expiresIn: '3d',
      },
    }),
  ],
  exports: [JwtModule],
})
export class SharedModule {}
