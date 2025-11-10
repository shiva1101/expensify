export const AUTH = {
  register: '/auth/register',
  login: '/auth/login',
  getUser: '/auth/getUser',
  uploadImage: '/auth/upload_image',
};

export const TRANSACTIONS = {
  getAll: '/transactions',
  create: '/transactions',
  update: (id) => `/transactions/${id}`,
  delete: (id) => `/transactions/${id}`,
  stats: '/transactions/stats',
  categories: '/transactions/categories',
};
