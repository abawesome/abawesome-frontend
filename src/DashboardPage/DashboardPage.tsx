import React, { FunctionComponent } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { DashboardPage as IDashboardPage } from './__generated__/DashboardPage';
import ProjectStatistics from '../ProjectPage/ProjectStatistics';
import { projectsLink, dashboardLink } from '../components/utils';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { Button } from 'antd';
import StylelessLink from '../components/StylelessLink';
const DASHBOARD_PAGE = gql`
    query DashboardPage {
        me {
            projects {
                name
                id
            }
            ...NavBar
            id
        }
    }
    ${NAVBAR_FRAGMENT}
`;

const DashboardPage: FunctionComponent = () => {
    const { loading, data, error } = useQuery<IDashboardPage>(DASHBOARD_PAGE);
    if (!data) return null;
    if (!data.me || !data.me.projects) return null;
    const { projects } = data.me;
    return (
        <>
            <NavBar path={[dashboardLink]} {...data.me} />
            <PageContentWrapper>
                <Text fontSize={48}>Your dashboard</Text>
                <CategoryBar title="your projects" addButtonLink={'/projects/new'} />
                <Flex flexWrap="wrap" mx={-2}>
                    {projects.map(
                        project =>
                            project && (
                                <Box width={[1, 1, 1, 1 / 3, 1 / Math.min(5, projects.length)]}>
                                    <StylelessLink to={`/project/${project.id}`}>
                                        <Card p={2}>
                                            <Text fontSize={20}>{project.name}</Text>
                                            <Text fontSize={14}>{project.id}</Text>
                                        </Card>
                                    </StylelessLink>
                                </Box>
                            ),
                    )}
                </Flex>
                <CategoryBar title="projects shared with you" />
            </PageContentWrapper>
        </>
    );
};
export default DashboardPage;
