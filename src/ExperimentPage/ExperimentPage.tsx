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
    query ExperimentPage($projectId: GuidGraphType!, $experimentId: GuidGraphType!) {
        project(id: $projectId) {
            experiment(experimentId: $experimentId) {
                id
                name
                variants {
                    name
                    id
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
                        <Card p={2} width={[1, 1, 1, 1 / 3, 1 / Math.min(5, (variants || []).length)]}>
                            <Text fontSize={20}>{variant && variant.name}</Text>
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
