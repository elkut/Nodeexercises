import { config } from "dotenv";
config();
export const alertdata = process.env.GOCALERTS;
export const isodata = process.env.ISOCOUNTRIES;
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const alertCollections = process.env.ALERTCOLLECTION; 