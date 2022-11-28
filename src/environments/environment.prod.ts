export const apiUrl = 'http://185.177.105.151:10040';
export const apiUrl1 = 'http://127.0.0.1:3000';
export const apiUrlChat = 'http://185.177.105.151:1998/';
export const prefix = '/api/en/'
export const environment = {
  production: true,
  url: apiUrlChat + '',
  imagePrefix: apiUrl + '',
  posts: {
    get: apiUrl1 + '/kids'
  },
  webPages: {
    kids: {
      get: apiUrl1 + '/kids'
    },
    rabbiVersion: {
      get: apiUrl1 + '/rabbi'
    },
    academic: {
      get: apiUrl1 + '/academic'
    },
    registration: apiUrl + prefix + 'registration',
    login:  apiUrl + prefix + 'login',
    logout:  apiUrl + prefix + 'logout'
  },
  baseUrl: apiUrl + prefix,
  admin: {
    login: apiUrl + prefix + 'admin/login',
    refresh: apiUrl + prefix + 'admin/refresh',
    logout: apiUrl + prefix + 'admin/logout',
    posts: {
      get: apiUrl + prefix + 'admin/post',
      getAllCategoryList: apiUrl + prefix + 'admin/post_category/list'
    },
    slider: apiUrl + prefix + 'admin/slider',
    category: apiUrl + prefix + 'admin/category',
    taxonomy: {
      get: apiUrl + prefix + 'admin/taxonomy'
    },
    volumes: {
      get: apiUrl + prefix + 'admin/volumes'
    },
    topics: {
      get: apiUrl + prefix + 'admin/topics'
    },
    topic_keys: {
      get:  apiUrl + prefix +  'admin/topics/keys'
    },
    users: {
      get: apiUrl + prefix + 'admin/admin',
    }
  },
  chat: {
    gateway: apiUrlChat + 'api/gateway?version=1.0&platform=web',
    login: apiUrlChat + 'api/login',
    getUserList: apiUrlChat + 'api/v1.0/room/list',
    joinRoom: apiUrlChat + 'api/v1.0/room'
  }
};
