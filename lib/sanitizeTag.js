var deburr = require('lodash/deburr');

export default (item) => {
    return deburr(item.toLowerCase().replace(/\s+/g, '-'));
}