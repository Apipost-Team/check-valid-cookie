const _ = require('lodash'),
    libUrl = require('url-parse'),
    libCookie = require('cookie');

function isvalid(url, cookie) {
    const _uri = new libUrl(url);

    // domain
    if (_.trim(cookie.domain) && !_.endsWith(_uri.hostname, _.trim(cookie.domain))) {
        return false;
    }

    // path
    if (_.trim(cookie.path) && !_.startsWith((_.endsWith(_uri.pathname, '/') ? _uri.pathname : `${_uri.pathname}/`),
        cookie.path)) {
        return false;
    }

    // expire
    let expires = new Date(cookie.expires);
    if (_.isDate(expires) && String(expires) != "Invalid Date" && _.lt(expires, new Date())) {
        return false;
    }

    // secure
    if (cookie.secure && _uri.protocol != 'https:') {
        return false;
    }

    return {
        "cookie": libCookie.serialize(cookie.name, cookie.value),
        "set-cookie": libCookie.serialize(cookie.name, cookie.value, cookie)
    }
}
