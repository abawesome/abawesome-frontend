import * as React from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import ProjectPage from './ProjectPage/ProjectPage';
import LoginPage from './LoginPage/LoginPage';
import { BrowserRouter, Route, Link, RouteComponentProps } from 'react-router-dom';
import { client } from './apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import ExperimentPage from './ExperimentPage/ExperimentPage';
import AddExperimentPage from './AddExperimentPage/AddExperimentPage';
import DashboardPage from './DashboardPage/DashboardPage';
import AddProjectPage from './AddProjectPage/AddProjectPage';

const ProjectPageWithParams = ({
    match: {
        params: { projectId },
    },
}: RouteComponentProps<{ projectId: string }>) => <ProjectPage projectId={projectId} />;

const ExperimentPageWithParams = ({
    match: {
        params: { projectId, experimentId },
    },
}: RouteComponentProps<{ projectId: string; experimentId: string }>) => (
    <ExperimentPage projectId={projectId} experimentId={experimentId} />
);

const AddExperimentPageWithParams = ({
    match: {
        params: { projectId },
    },
}: RouteComponentProps<{ projectId: string }>) => <AddExperimentPage projectId={projectId} />;

const App: React.FunctionComponent<{}> = () => (
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <>
                <BrowserRouter>
                    <Route exact path="/" component={DashboardPage} />
                    <Route
                        exact
                        path="/project/:projectId/experiment/:experimentId"
                        component={ExperimentPageWithParams}
                    />
                    <Route exact path="/projects/new" component={AddProjectPage} />
                    <Route exact path="/project/:projectId/experiments/new" component={AddExperimentPageWithParams} />
                    <Route exact path="/project/:projectId" component={ProjectPageWithParams} />
                    <Route exact path="/login" component={LoginPage} />
                </BrowserRouter>
            </>
        </ThemeProvider>
    </ApolloProvider>
);
export default App;
