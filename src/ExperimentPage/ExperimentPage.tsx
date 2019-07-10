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
const EXPERIMENT_PAGE = gql`
    query ExperimentPage($projectId: String!, $experimentId: String!) {
        me {
            project(projectId: $projectId) {
                experiment(experimentId: $experimentId) {
                    id
                    name
                    variants {
                        name
                        id
                        readableVariantId
                    }
                }
                name
                id
            }
            ...NavBar
            id
        }
    }
    ${NAVBAR_FRAGMENT}
`;

const ExperimentPage: FunctionComponent<ExperimentPageVariables> = ({ projectId, experimentId }) => {
    const { loading, data, error } = useQuery<IExperimentPage, ExperimentPageVariables>(EXPERIMENT_PAGE, {
        variables: { projectId, experimentId },
    });
    if (!data) return null;
    if (!data.me || !data.me.project || !data.me.project.experiment) return null;
    const { name, variants } = data.me.project.experiment;
    return (
        <>
            <NavBar
                path={[
                    projectsLink,
                    { label: data.me.project.name, link: `/project/${projectId}` },
                    {
                        label: data.me.project.experiment.name,
                        link: `/project/${projectId}/experiment/${experimentId}`,
                    },
                ]}
                {...data.me}
            />
            <PageContentWrapper>
                <Text fontSize={48}>{name}</Text>
                <CategoryBar title="variants" />
                <Flex flexWrap="wrap" mx={-2}>
                    {variants.map(variant => (
                        <Card p={2} width={[1, 1, 1, 1 / 3, 1 / Math.min(5, variants.length)]}>
                            <Text fontSize={20}>{variant.name}</Text>
                            <Text fontSize={14}>{variant.readableVariantId}</Text>
                        </Card>
                    ))}
                </Flex>
                <CategoryBar title="statistics" />
                <Flex flexWrap="wrap" mx={-2}>
                    <Card p={2} width={[1, 1, 1, 1 / 2, 1 / 2]}>
                        <ProjectStatistics />
                    </Card>
                    <Card p={2} width={[1, 1, 1, 1 / 2, 1 / 2]}></Card>
                </Flex>
                <CategoryBar title="related events" />
                <Flex flexWrap="wrap" mx={-2}></Flex>
            </PageContentWrapper>
        </>
    );
};
export default ExperimentPage;
