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
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    if(process.env.NODE_ENV === `production`){
        app.use(express.static(path.join(__dirname, '../client/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/build/index.html'));
        });
    }

    db.once(`open`, ()=>{
        app.listen(PORT, ()=>{
            console.log(`API server running on port ${PORT}!`)
        })
    });
})
.catch(error =>{
    console.log(error)
})