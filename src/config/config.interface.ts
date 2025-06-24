export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  throttler: ThrottlerConfig;
  security: SecurityConfig;
  mongoDb: MongoDbConfig;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface ThrottlerConfig {
  ttl: number;
  limit: number;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: number;
}

export interface MongoDbConfig {
  connectionString: string;
  dbName: string;
}
