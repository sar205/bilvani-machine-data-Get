// routes/colorRoutes.js
const express = require('express');
const router = express.Router();

const {saveMixColor , getsaveColor} =  require('../../controller/saveMixColor/saveMixColor');

router.route('/').post(saveMixColor);

router.route('/get').get(getsaveColor);

module.exports = router;
