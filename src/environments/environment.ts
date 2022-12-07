import {apiUrlChat} from "./environment.prod";

export const apiUrl = 'http://185.177.105.151:10040';
export const apiUrl1 = 'http://185.177.105.151:8983';
export const prefix = '/api/en/';
export const environment = {
    production: true,
    url: apiUrlChat + '',
    imagePrefix: apiUrl + '',
    posts: {
        get: apiUrl1 + '/solr/talmudy_eng/select'
    },
    webPages: {
        kids: {
            get: apiUrl1 + '/solr/talmudy_eng/select'
        },
        june2020: {
            get: apiUrl1 + '/solr/talmudy_eng/select'
        },
        academic: {
            get: apiUrl1 + '/solr/talmudy_eng/select'
        },
        pieces: {
            get: apiUrl1 + '/solr/talmudy_eng/select'
        },
        registration: apiUrl + prefix + 'registration',
        login:  apiUrl + prefix + 'login',
        logout:  apiUrl + prefix + 'logout',
        refresh:  apiUrl + prefix + 'refresh'
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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
