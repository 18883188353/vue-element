const api = {
    prod: require('./api/api.prod'),
    dev: require('./api/api.dev'),
    '0.64': require('./api/api.0.64'),
    'test': require('./api/api.test'),
    '0.56': require('./api/api.0.56')
}
module.exports = {
    state: api[process.env.API_HOST]
}
