export interface configDb {
  url?: string;
  password?: string;
  username?: string;
  database?: string;
  port?: number;
}

export interface configData {
  url: string;

  secretKey: string;

  db: configDb;

  loglevel: string;

  env: string;

  appPort: number;
}
