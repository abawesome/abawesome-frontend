import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ProjectStatistics from '../ProjectPage/ProjectStatistics';
import { projectsLink } from '../components/utils';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { AddExperimentPageVariables, AddExperimentPage as IAddExperimentPage } from './__generated__/AddExperimentPage';
import { CreateExperimentVariables, CreateExperiment as ICreateExperiment } from './__generated__/CreateExperiment';
import { Input, Form, Button, List } from 'antd';
import styled from 'styled-components';
import RightAlignBox from '../components/RightAlignBox';
import { Redirect } from 'react-router';
import paths from '../paths';
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

const CREATE_EXPERIMENT = gql`
    mutation CreateExperiment($experiment: ExperimentInput!) {
        createExperiment(experiment: $experiment) {
            id
        }
    }
`;

const AddExperimentPage: FunctionComponent<AddExperimentPageVariables> = ({ projectId }) => {
    const { loading, data, error } = useQuery<IAddExperimentPage, AddExperimentPageVariables>(ADD_EXPERIMENT_PAGE, {
        variables: { projectId },
    });

    const [createExperiment, { loading: mutationLoading, data: mutationData, error: mutationError }] = useMutation<
        ICreateExperiment,
        CreateExperimentVariables
    >(CREATE_EXPERIMENT);

    const [variants, setVariants] = useState<{ name: string }[]>([]);
    const [experimentName, setExperimentName] = useState('');
    const [experimentDescription, setExperimentDescription] = useState('');
    const [variantInput, setVariantInput] = useState('');

    const onCreateClick = () => {
        createExperiment({
            variables: {
                experiment: {
                    projectId,
                    name: experimentName,
                    description: experimentDescription,
                    variants,
                },
            },
        });
    };

    if (!data) return null;
    if (!data.me || !data.me.project || !data.me.project) return null;
    if (mutationData && mutationData.createExperiment) {
        return (
            <>
                Loading stuff
                <Redirect to={`/project/${data.me.project.id}/experiment/${mutationData.createExperiment.id}`} />
            </>
        );
    }

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
                                value={experimentName}
                                onChange={event => setExperimentName(event.target.value)}
                            />
                            <Input
                                placeholder="Experiment Description"
                                value={experimentDescription}
                                onChange={event => setExperimentDescription(event.target.value)}
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
                                <Box ml={1}>
                                    <Button
                                        onClick={() => setVariants([...variants, { name: variantInput }])}
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </Flex>
                            <List
                                locale={{ emptyText: 'Add the first variant' }}
                                bordered
                                dataSource={variants}
                                renderItem={variant => <List.Item>{variant.name}</List.Item>}
                            ></List>
                            <RightAlignBox mt={3}>
                                <Button
                                    disabled={!(experimentName && variants.length > 0)}
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    onClick={onCreateClick}
                                >
                                    Create
                                </Button>
                            </RightAlignBox>
                        </Box>
                    </Flex>
                </Card>
            </PageContentWrapper>
        </>
    );
};
export default AddExperimentPage;
