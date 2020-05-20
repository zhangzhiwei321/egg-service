'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let name;
    if (ctx.query.name) {
      name = ctx.query.name;
    } else if (ctx.request.body.name) {
      name = ctx.request.body.name
    } else {
      name = 'egg'
    }
    ctx.body = `<h1>hi,${name}</h1>`;
  }
}

module.exports = HomeController;
