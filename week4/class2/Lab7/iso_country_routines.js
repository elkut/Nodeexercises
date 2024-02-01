import got from "got";

export const getJSONFromWWWPromise = (url) => got(url).json();

