const { model, Schema } = require('mongoose');


const WalletSchema = new Schema({
    privateKeyPassword: {
        type: String,
        required: true
    }
});

module.exports = model('Wallet', WalletSchema);
