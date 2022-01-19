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
        },
        find_user_requests: async(parent, {username})=>{
            return User.find({GameRequest})
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

            const correctPassword = await user.isCorrectPassword(password);
            if(!correctPassword){
                throw new AuthenticationError(`Incorrect Credentials`);
            }

            const token = signToken(user);
            
            return {token, user};
        },
        addGameRequest: async(parent, {game, description}, context)=>{
            if(context.user){
                const gamerequest = await GameRequest.create({
                    game, 
                    description,
                    username: context.user.username
                });  
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { GameRequests: GameRequest._id } }
                );
                return gamerequest;
            };
            throw new AuthenticationError('You need to be logged in!');
        },
        removeGameRequest: async(parent, {_id})=>{
            return GameRequest.findOneAndDelete({_id: _id});
        }
    }
}

module.exports = resolvers