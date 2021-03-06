'use strict';

const { route } = require('../utils');
// 密码的加、解密钥
module.exports.PWD_KEYGEN = 'hahaha123';
// jwt的加、解密钥
module.exports.JWT_KEYGEN = 'BJBWWZGZ';

// 商品列表排序的默认过滤参数
module.exports.PRODUCT_DEFAULT_SORTNAME = 'sales';
// 商品列表排序的默认过滤数据
module.exports.PRODUCT_DEFAULT_SORTTYPE = 'ASC';
// 超级白名单，登录和身份都不需要验证
module.exports.ROUTER_WHITE_LIST = [
    route('/user/login', 'POST'),
    route('/user/registry', 'POST'),
    route('/user/upload', 'POST'),
    route('/product/list', 'GET'),
    route('/address/list', 'GET'),
    route('/product/edit', 'PUT'),
];