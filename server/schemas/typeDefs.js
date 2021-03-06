console.log(`typeDefs.js`);
const {gql} = require(`apollo-server-express`);

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email:String
        password: String
        alternate_ids: String
        gameRequests: GameRequest

    }

    type GameRequest {
        _id: ID
        username: String
        game: String
        description: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        find_users: [User]
        find_user(username: String!): User
        find_user_requests(username: String): GameRequest
        find_gameRequest(game: String!): GameRequest
    }

    type Mutation {
        addUser(username: String!, email: String!, password:String!): Auth
        login(username: String!, password: String!): Auth
        addGameRequest(username: String! , game: String!, description: String!): GameRequest
        removeGameRequest(_id: ID!): GameRequest
    }
`;

module.exports = typeDefs;