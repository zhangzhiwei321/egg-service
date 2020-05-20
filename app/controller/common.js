'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {
    async upload() {
        const { ctx } = this;
        const parts = ctx.multipart();
        let part;
        const files = [];
        const fields = {};
        while ((part = await parts()) != null) {
            if (!part.length) {
                let result;
                try {
                    const name = new Date().getTime() * Math.floor((Math.random() * 10000000)) + '.' + path.basename(part.mimeType.split('/')[1]);
                    result = await ctx.service.uploadfile.saveFile(name, part);
                    files.push(result.url)
                } catch (error) {
                    await sendToWormhole(part);
                    throw error;
                }
            } else {
                fields[part[0]] = part[1]
            }
        }


        ctx.body = {
            urls: files,
            // 所有表单字段都能通过 `stream.fields` 获取到
            fields: fields
        };
    }
}

module.exports = UploadController;
