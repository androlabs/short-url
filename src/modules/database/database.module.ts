import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongoDbProvider } from 'src/config';

@Module({
  imports: [ConfigModule],
  providers: [...mongoDbProvider],
  exports: [...mongoDbProvider],
})
export class DatabaseModule {}
