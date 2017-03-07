'use strict'

import queryString from 'query-string';
import _ from 'lodash';
import Mock from 'mockjs';
import config from './config';

let request;

export default request = {
    get(url, params) {
        if (params) url += `?${queryString.stringify(params)}`;
        return fetch(url)
            .then(response => response.json())
            .then(response => Mock.mock(response));
    },
    post(url, body){
        let options = _.extend(config.header, {
            body: JSON.stringify(body)
        });
        return fetch(url, options)
            .then(response => response.json())
            .then(response => Mock.mock(response));
    }
};
