'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class UploadfileService extends Service {
    async saveFile(name, stream) {
        const { app } = this;
        const wstream = fs.createWriteStream('./app/public/uploadfile/' + name);
        stream.pipe(wstream)
        return { url: app.config.uploadpah + name }
    }
}

module.exports = UploadfileService;