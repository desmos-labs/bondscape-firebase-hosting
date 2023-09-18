const { join } = require('path')
const { https } = require('firebase-functions')
const next = require('next')

const nextjsDistDir = join('src', require('./next.config.js').distDir)
console.log(nextjsDistDir);

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
})
const nextjsHandle = nextjsServer.getRequestHandler()

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})