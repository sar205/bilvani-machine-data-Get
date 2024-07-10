const express = require("express");
const app = express();

const cors = require('cors');
const body = require('body-parser');
const BASE_URL = process.env.BASE_URL;
require("dotenv").config();

////! All import of the Mongodb
require('./mongodb/config');
require('./mongodb/signupController/signupController');
require('./mongodb/signinController/signinController');
require('./mongodb/savedMixColor/saveMixeColor');

app.use(cors());
app.use(body.json())

/////! All routes import 
const colorCodeApi = require('./routes/color_code_api/color_code_api');
const signupController = require('./routes/signupController/signupController');
const signinController =  require('./routes/signinController/signinController');
const saveMixColors = require('./routes/saveMixColor/saveMixColor');
const getsaveColor  = require('./routes/saveMixColor/saveMixColor')

app.use('/',colorCodeApi);
app.use('/sign-up', signupController);
app.use('/sign-in',signinController)
app.use('/save-mixColor',saveMixColors);



const port = 2000;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});
