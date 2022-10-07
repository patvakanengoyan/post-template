export const apiUrl = 'http://192.168.0.116:8000';
export const apiUrl1 = 'http://127.0.0.1:3000';
export const prefix = '/api/en/'
export const environment = {
  production: false,
  imagePrefix: apiUrl + '',
  posts: {
    get: apiUrl1 + '/data'
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
    category: apiUrl + prefix + 'admin/category'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
