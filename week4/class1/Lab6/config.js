import { config } from 'dotenv';
config();
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const isodata = process.env.ISOCOUNTRIES;
export const collections = process.env.COLLECTION; 