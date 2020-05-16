export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default_code',
    expiresIn: '1d',
  },
};
