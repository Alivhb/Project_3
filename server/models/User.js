console.log(`Users.js`);
const {Schema, model} = require(`mongoose`);
const bcrypt = require(`bcrypt`);

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength:3,
        maxlength:20,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password:{
        type:String,
        required: true,
        minlength: 6,
    },
    alternate_ids:{
        type: String,
        
    },
    GameRequests:[
        {
            type: Schema.Types.ObjectId,
            ref: `GameRequest`, 
        }
    ]

});


  
const User = model('User', userSchema);

module.exports = User
