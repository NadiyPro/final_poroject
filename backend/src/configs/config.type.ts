export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  aws: AwsConfig;
  // sentry: SentryConfig;
  jwt: JwtConfig;
  email: EmailConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
};
export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};
export type AwsConfig = {
  accessKey: string;
  secretKey: string;
  bucketAvatar: string;
  bucketCars: string;
  region: string;
  ACL: string;
  endpoint: string;
};
// export type SentryConfig = {
//   dsn: string;
//   env: string;
//   debug: boolean;
// };
export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  accessActiveExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: string | number;
};

export type EmailConfig = {
  email: string;
  password: string;
};
