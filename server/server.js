console.log(`server.js`);
const express = require(`express`);
const path = require(`path`);
const {ApolloServer} = require(`apollo-server-express`);
const db = require(`./config/connection`);
const {typeDefs, resolvers} = require(`./schemas`);
const { error } = require("console");


const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({typeDefs, resolvers});

server.start().then(res =>{
    server.applyMiddleware({ app });
    app.listen(PORT, ()=>{
        console.info(`Server is Running on Port 3001`);
    });
})
.catch(error =>{
    console.log(error)
})