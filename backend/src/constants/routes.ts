export const routes = {
  base: '/',
  id: '/:id',
  auth: {
    registration: '/registration',
    login: '/login',
    refresh: '/refresh',
    logout: '/logout',
    updateInfo: '/update-info',
  },
  tasks: {
    dnd: '/dnd',
  },
} as const;
