import pg from "pg";
const { Pool } = pg;
import config from "../config/config";

const pool = new Pool(config.pg);

export default pool;
