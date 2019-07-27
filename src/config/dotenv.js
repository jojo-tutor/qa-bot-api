import { resolve } from 'path';
import { config } from 'dotenv';

const envPath = resolve(process.cwd(), process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env');
config({ path: envPath });
