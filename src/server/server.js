const express= require('express');
const apiRouter =require('./routes');

const app = express();

app.use(apiRouter);

const port = 3001;
app.listen(port, () => console.log(`Server listening on port: ${port}`));