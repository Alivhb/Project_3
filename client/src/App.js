import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import homepage from './pages/homepage';


const client = new ApolloClient({
    uri: `/graphql`,
    cache: new InMemoryCache(),
});

function App (){
    return <ApolloProvider client = {client}>
        <Router> 
            <Routes>
                <Route exact path ="/" element = {homepage}/>
            </Routes>
        </Router>
    </ApolloProvider>
}

export default App;