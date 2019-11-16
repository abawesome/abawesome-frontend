import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ProjectStatistics from '../ProjectPage/ProjectStatistics';
import { projectsLink } from '../components/utils';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { AddExperimentPageVariables, AddExperimentPage as IAddExperimentPage } from './__generated__/AddExperimentPage';
import { Input, Form, Button, List } from 'antd';
import styled from 'styled-components';
import RightAlignBox from '../components/RightAlignBox';
const ADD_EXPERIMENT_PAGE = gql`
    query AddExperimentPage($projectId: String!) {
        me {
            project(projectId: $projectId) {
                name
                id
            }
            ...NavBar
            id
        }
    }
    ${NAVBAR_FRAGMENT}
`;

const AddExperimentPage: FunctionComponent<AddExperimentPageVariables> = ({ projectId }) => {
    const { loading, data, error } = useQuery<IAddExperimentPage, AddExperimentPageVariables>(ADD_EXPERIMENT_PAGE, {
        variables: { projectId },
    });
    const [variants, setVariants] = useState<{ name: string }[]>([]);
    const [experimentInput, setExperimentInput] = useState('');
    const [variantInput, setVariantInput] = useState('');
    if (!data) return null;
    if (!data.me || !data.me.project || !data.me.project) return null;
    const { name } = data.me.project;
    return (
        <>
            <NavBar
                path={[
                    projectsLink,
                    { label: data.me.project.name, link: `/project/${projectId}` },
                    {
                        label: 'Add a new experiment',
                    },
                ]}
                {...data.me}
            />
            <PageContentWrapper>
                <Text fontSize={48}>Add a new experiment</Text>

                <Card my={3}>
                    <Flex>
                        <Box p={4} width={1 / 2}>
                            <Input
                                size="large"
                                placeholder="Experiment Name"
                                value={experimentInput}
                                onChange={event => setExperimentInput(event.target.value)}
                            />
                            <Text mt={3} mb={1}>
                                Variants:
                            </Text>
                            <Flex mb={1}>
                                <Input
                                    size="large"
                                    placeholder="Variant Name"
                                    value={variantInput}
                                    onChange={event => setVariantInput(event.target.value)}
                                />
                            </Box>
                    </Box>
                    <RightAlignBox>
                        <Button.Group size="large">
                            <Button onClick={() => history.replace(paths.project(projectId))}>Cancel</Button>
                            <Button type="primary" onClick={onCreateClick}>
                                Create Experiment
                            </Button>
                        </Button.Group>
                    </RightAlignBox>
                </Card>
            </PageContentWrapper>
        </>
    );
};
export default AddExperimentPage;
