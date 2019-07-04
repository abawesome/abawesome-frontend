import * as React from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import ProjectPage from './ProjectPage/ProjectPage';
import LoginPage from './LoginPage/LoginPage';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { client } from './apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

const App: React.FunctionComponent<{}> = () => (
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <>
                <NavBar />
                <BrowserRouter>
                    <Route path="/project" exact component={ProjectPage} />
                    <Route path="/login" exact component={LoginPage} />
                </BrowserRouter>
            </>
        </ThemeProvider>
    </ApolloProvider>
);
export default App;
