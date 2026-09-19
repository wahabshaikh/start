export type Env = {
  DB: D1Database;
  STORAGE: R2Bucket;
  CACHE: KVNamespace;
  JOBS: Queue;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL?: string;
  WEB_ORIGIN?: string;
  MOBILE_ORIGIN?: string;
};
