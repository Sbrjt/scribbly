import { User } from "@/models/user";
import { DataSource } from "typeorm";
import { config } from "./config";

const {
  PG_HOST: host,
  PG_PORT: port,
  AUTH_DB_NAME: database,
  PG_USER: username,
  PG_PASSWORD: password,
  IS_PROD,
} = config;

export const db = new DataSource({
  type: "postgres",
  host,
  port,
  database,
  username,
  password,
  entities: [User],
  synchronize: !IS_PROD,
});

export const initializeDatabase = async () => {
  try {
    await db.initialize();
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
    throw error;
  }
};
