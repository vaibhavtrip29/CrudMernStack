const mongoose = require("mongoose");

const SportSchema = new mongoose.Schema({
    sportName: {
        type: String,
        required: true,
    },
    daysSinceIWatched: {
        type: Number,
        required: true,
    },
});

const Sport = mongoose.model("Sport", SportSchema);
module.exports = Sport;