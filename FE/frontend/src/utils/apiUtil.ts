export const get = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error: any) {
    //	TODO: check error type
    console.error(error.message);
    return null;
  }
};