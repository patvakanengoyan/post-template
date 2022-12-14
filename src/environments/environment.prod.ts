export const apiUrl = 'http://185.177.105.151:10040';
export const apiUrl1 = 'http://185.177.105.151:8983';
export const apiUrlChat = 'http://185.177.105.151:1998/';
export const prefix = '/api/en/';
export const environment = {
  production: true,
  url: apiUrlChat + '',
  imagePrefix: apiUrl + '',
  posts: {
    get: apiUrl + prefix + 'solr'
  },
  webPages: {
    slider: {
      get: apiUrl + prefix + 'slide',
    },
    kids: {
      get: apiUrl + prefix + 'solr'
    },
    june2020: {
      get: apiUrl + prefix + 'solr'
    },
    academic: {
      get: apiUrl + prefix + 'solr'
    },
    pieces: {
         get: apiUrl + prefix + 'solr'
    },
    registration: apiUrl + prefix + 'registration',
    login:  apiUrl + prefix + 'login',
    logout:  apiUrl + prefix + 'logout',
    refresh:  apiUrl + prefix + 'refresh',
    profile: apiUrl + prefix + 'profile'
  },
  baseUrl: apiUrl + prefix,
  admin: {
    login: apiUrl + prefix + 'admin/login',
    refresh: apiUrl + prefix + 'admin/refresh',
    logout: apiUrl + prefix + 'admin/logout',
    posts: {
      get: apiUrl + prefix + 'admin/post',
      getAllCategoryList: apiUrl + prefix + 'admin/post_category/list',
      getTaxonomyList: apiUrl + prefix + 'admin/taxonomy',
      getVolumesList: apiUrl + prefix + 'admin/volumes',
      getTopicList: apiUrl + prefix + 'admin/topics'
    },
    slider: apiUrl + prefix + 'admin/slide',
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
      get: apiUrl + prefix + 'admin/user',
    },
    admins: {
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
