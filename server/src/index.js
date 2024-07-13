const express = require('express');
const route = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

route(app);

// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//     next();
// });

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});