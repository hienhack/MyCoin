const walletRouter = require('./wallet.route');
const transactionRouter = require('./transaction.route');
const blockRouter = require('./block.route');

const route = (app) => {
    app.use('/wallet', walletRouter);
    app.use('/transaction', transactionRouter);
    app.use('/block', blockRouter);
}

module.exports = route;