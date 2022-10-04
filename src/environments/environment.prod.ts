export const apiUrl = 'http://localhost:3000';
export const prefix = '/api'
export const environment = {
    production: false,
    g: {
        get: apiUrl + '/data'
    },
    baseUrl: apiUrl + prefix,
    admin: {
      login: '',
      refresh: ''
    }
};
