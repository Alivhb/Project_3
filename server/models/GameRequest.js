console.log(`GameRequest.js`);
const { Schema, model } = require("mongoose");

const gamerequestSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    game:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        maxlength: 100,
    }
    
})

module.exports = model('GameRequest', gamerequestSchema); 
