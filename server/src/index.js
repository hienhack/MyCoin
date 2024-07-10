const express = require('express');
const route = require('./routes');

const app = express();

route(app);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});