import React, { FunctionComponent } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import ProjectStatistics from './ProjectStatistics';
import Experiments from './Experiments';
import Events from './Events';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { projectPage } from './__generated__/projectPage';
const PROJECT_PAGE = gql`
    query projectPage {
        me {
            id
            projects {
                id
            }
        }
    }
`;

const ProjectPage: FunctionComponent<{}> = () => {
    const { loading, data, error } = useQuery<projectPage>(PROJECT_PAGE);
    console.log({ loading, data, error });
    return (
        <PageContentWrapper>
            <Text fontSize={48}>My Awesome Project</Text>
            <CategoryBar title="statistics" />
            <Flex flexWrap="wrap" mx={-3}>
                <Card px={3} width={[1, 1, 1, 1 / 2, 1 / 2]}>
                    <ProjectStatistics />
                </Card>
                <Card px={3} width={[1, 1, 1, 1 / 2, 1 / 2]}></Card>
            </Flex>
            <CategoryBar title="experiments" onAddButtonClick={() => null} />
            <Flex flexWrap="wrap" mx={-3}>
                <Experiments />
            </Flex>
            <CategoryBar title="events" onAddButtonClick={() => null} />
            <Flex flexWrap="wrap" mx={-3}>
                <Events />
            </Flex>
        </PageContentWrapper>
    );
};
export default ProjectPage;
