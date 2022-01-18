console.log(`connection.js`);
const mongoose = require(`mongoose`);
require(`dotenv`).config();
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const dbname = process.env.MONGO_BDNAME;


mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.yzevw.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
.catch(error =>{
    console.log(error);
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log(mongoose.connection.readyState);
  console.log("Connected successfully");
});


module.exports = db;