import * as mongoose from 'mongoose';

export const mongoDbProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://root:root@192.168.10.169:27017'),
  },
];
