import { Module } from '@nestjs/common';
import { mongoDbProvider } from 'src/config';

@Module({
  providers: [...mongoDbProvider],
  exports: [...mongoDbProvider],
})
export class DatabaseModule {}
