import got from "got";
const getJSONFromWWWPromise = (url) => got(url).json();
export default getJSONFromWWWPromise;