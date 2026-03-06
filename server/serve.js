const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

const pathToFrontend = path.join(__dirname, '../frontend/dist');
const serveStatic = express.static(pathToFrontend);
app.use(serveStatic);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
