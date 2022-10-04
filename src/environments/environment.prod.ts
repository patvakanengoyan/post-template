export const apiUrl = 'http://localhost:3000';
export const prefix = '/api'
export const environment = {
    production: false,
    posts: {
        get: apiUrl + '/data'
    },
    baseUrl: apiUrl + prefix,
    admin: {
      login: apiUrl + prefix + '',
      refresh: apiUrl + prefix +  '',
      logout: apiUrl + prefix +  ''
    }
};
