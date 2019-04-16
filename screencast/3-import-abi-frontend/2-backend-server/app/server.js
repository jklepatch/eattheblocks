const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '../build/contracts')));

app.listen(3000, () => console.log('backend running on port 3000...'));
