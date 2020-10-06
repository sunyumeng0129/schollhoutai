/*
 * @Author: heinan 
 * @Date: 2020-07-15 10:23:53 
 * @Last Modified by: heinan
 * @Last Modified time: 2020-07-16 15:26:45
 */
'use strict';

const Service = require('egg').Service;
const { idCreator } = require('../utils');
const { PRODUCT_DEFAULT_SORTNAME, PRODUCT_DEFAULT_SORTTYPE } = require('../config');

class ProductService extends Service {
    async type() {
        const $sql = 'SELECT t_text,t_type FROM type`type`';
        return await this.ctx.app.mysql.query($sql)
    }
    async sort({ t_type }) {
        const $sql = 'SELECT sort.s_type,sort.t_type,sort.s_text FROM type,`sort` WHERE sort.t_type=type.t_type AND type.t_type=?';
        return await this.ctx.app.mysql.query($sql, [t_type])
    }
    async list() {
        const $sql = `select * from product `;
        return await this.ctx.app.mysql.query($sql)
    }
    async add({ pname, imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc }) {
        const pid = idCreator(pname);
        const $params = [pid, pname, imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc];
        const $sql = 'insert into product (pid,pname, imgUrl, sales, original_price, sale_price, `mode`, s_type, t_type, carousel, `desc` ) values (?,?,?,?,?,?,?,?,?,?,?)';
        return await this.ctx.app.mysql.query($sql, $params)
    }
    async edit({ pname, imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc, cid, pid }) {
        const $sql = 'update product set pname=?, imgUrl=?, sales=?,original_price=?, sale_price=?,mode=?, s_type=?,t_type=?, carousel=?,`desc`=?,cid=? where pid=?';
        // const $sql = 'UPDATE `mart`.`product` SET `pname`=?, `imgUrl`=?, `sales`=?, `original_price`=?, `sale_price`=?, `mode`=?, `s_type`=?, `t_type`=?, `cid`=?, `carousel`=?, `desc`=? WHERE  `pid`=?'
        const $params = [pname, imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc, cid, pid];
        return await this.ctx.app.mysql.query($sql, $params)

        // const $sql = 'update product set cid=?, pname=?, imgUrl=?, sales=?,original_price=?,ale_price=?, mode=?,  s_type=?, t_type=?, carousel=?, desc=? where pid=?';
        // const $params = [pname, imgUrl, sales, original_price, sale_price, mode, s_type, t_type, carousel, desc, pid];
        // return await this.ctx.app.mysql.query($sql, $params)
    }
    async delete({ pid }) {
        const $sql = 'delete from product where pid=?';
        const $params = [pid];
        return await this.ctx.app.mysql.query($sql, $params)
    }
    async searchByType({ keyword }) {
        const $sql = `select * from product where pname like '%${keyword}%'`;
        return await this.ctx.app.mysql.query($sql)
    }
    async Detail({ pid }) {
        const $sql = 'select * from product where pid = ?';
        return await this.ctx.app.mysql.query($sql, [pid])
    }

}

module.exports = ProductService;