const helmet = require('helmet')
const compression = require('compression')

module.exports = function (app) {
    app.use(helmet())
    app.use(compression())
}

/*
helmet to protect our app from known web vulnerabilities
Compression to compress http response sent to client 
module contains middleware for production environment
*/