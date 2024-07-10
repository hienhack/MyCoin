const walletRouter = require('./wallet.route');

const route = (app) => {
    app.use('/wallet', walletRouter);
}

module.exports = route;