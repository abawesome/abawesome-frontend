import React, { FunctionComponent } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ExperimentPage as IExperimentPage, ExperimentPageVariables } from './__generated__/ExperimentPage';
import ProjectStatistics from '../ProjectPage/ProjectStatistics';
import { projectsLink } from '../components/utils';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { Button } from 'antd';
import EventChart from '../components/EventChart';
import AnswerChart from '../components/AnswerChart';
import VariantCard from './VariantCard';
const EXPERIMENT_PAGE = gql`
    query ExperimentPage($projectId: String!, $experimentId: String!) {
        project(id: $projectId) {
            experiment(experimentId: $experimentId) {
                id
                name
                variants {
                    name
                    id
                    description
                }
            }
            name
            id
        }
        me {
            ...NavBar
        }
    }

    ${NAVBAR_FRAGMENT}
`;

const ExperimentPage: FunctionComponent<ExperimentPageVariables> = ({ projectId, experimentId }) => {
    const { loading, data, error } = useQuery<IExperimentPage, ExperimentPageVariables>(EXPERIMENT_PAGE, {
        variables: { projectId, experimentId },
    });
    if (!data || !data.project || !data.me || !data.project.experiment) return null;
    if (!data.project.experiment) return null;
    const { name, variants } = data.project.experiment;
    return (
        <>
            <NavBar
                path={[
                    projectsLink,
                    { label: data.project.name, link: `/project/${projectId}` },
                    {
                        label: data.project.experiment.name,
                        link: `/project/${projectId}/experiment/${experimentId}`,
                    },
                ]}
                {...data.me}
            />
            <PageContentWrapper>
                <Text fontSize={48}>{name}</Text>
                <CategoryBar title="variants" />
                <Flex flexWrap="wrap" mx={-2}>
                    {(variants || []).map(variant => (
                        <VariantCard {...variant} />
                    ))}
                </Flex>
                <CategoryBar title="results" />
                <Flex flexWrap="wrap" mx={-2}>
                    <Card p={2} width={[1 / 2]}>
                        <ProjectStatistics />
                    </Card>
                    <Card p={2} width={[1]}>
                        <EventChart />
                    </Card>
                </Flex>

                <CategoryBar title="questions" />
                <Flex flexWrap="wrap" mx={-2}>
                    <Card p={2} width={[1]}>
                        <AnswerChart />
                    </Card>
                </Flex>
            </PageContentWrapper>
        </>
    );
};
export default ExperimentPage;
