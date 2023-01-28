const express = require('express');

const app = express();
const port = 3000 || process.env.PORT;

app.get('/', (req, res) => res.send('Hello from server!'));

app.listen(() => {
    console.log(`Server is listening port ${port}...`);
})