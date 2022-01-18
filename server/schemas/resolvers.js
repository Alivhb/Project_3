console.log(`resolver.js`);
const {AuthenticationError} = require(`apollo-server-express`);
const {signToken} = require(`../utils/auth`);
const {User, GameRequest} = require(`../models`);

console.log({User});
const resolvers = {
    Query:{
        find_users: async(parent, {User}) =>{
            return User.find({User});
        },
        find_user: async(parent, {username}) =>{
            return User.findOne({username});
        },
        find_gameRequest: async(parent, {game}) =>{
            return GameRequest.find({game});
        }
    },

    Mutation:{
        addUser: async(parent, {username, email, password})=>{
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async(parent, {username, password})=>{
            const user = await User.findOne({username});
            if(!user){
                throw new AuthenticationError(`Incorrect Credentials`);
            }

            const correctPassword = await User.isCorrectPassword(password);
            if(!correctPassword){
                throw new AuthenticationError(`Incorrect Credentials`);
            }

            const token = signToken(user);
            
            return {token, user};
        },
        addGameRequest: async(parent, {user_id, game, description})=>{
            const gamerequest = await GameRequest.create({user_id, game, description});

            return gamerequest;
        },
        removeGameRequest: async(parent, {_id})=>{
            return GameRequest.findOneAndDelete({_id: _id});
        }
    }
}

module.exports = resolvers