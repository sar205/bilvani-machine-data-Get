
const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    colors: [
        {
            hex: String,
            shade: String,
            intensity: Number
        }
    ],

    mixedColorHex: String,
    fetched: {
        type: Boolean,
        default: false
    }
});

const Color = mongoose.model('saveMixedColor', colorSchema);

module.exports = Color;
