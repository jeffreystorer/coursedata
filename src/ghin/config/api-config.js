//eslint-disable-next-line
export default {
  api: {
    host: import.meta.env.VITE_API_HOST,
  },
  secret_key: import.meta.env.VITE_ENCODE_KEY,
  public_key: import.meta.env.VITE_PUBLIC_KEY,
};
