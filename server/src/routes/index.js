const walletRouter = require('./wallet.route');
const transactionRouter = require('./transaction.route');

const route = (app) => {
    app.use('/wallet', walletRouter);
    app.use('/transaction', transactionRouter);
}

module.exports = route;