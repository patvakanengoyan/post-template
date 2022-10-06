export const apiUrl = 'http://192.168.0.116:8000';
export const prefix = '/api/en/'
export const environment = {
    production: false,
    posts: {
        get: apiUrl + '/data'
    },
    baseUrl: apiUrl + prefix,
    admin: {
      login: apiUrl + prefix + 'admin/login',
      refresh: apiUrl + prefix +  'admin/refresh',
      logout: apiUrl + prefix +  'admin/logout',
      posts: apiUrl + prefix + 'admin/post',
      slider: apiUrl + prefix + 'admin/slider',
      category: apiUrl + prefix + 'admin/category'
    }
};
