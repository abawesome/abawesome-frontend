import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ProjectStatistics from '../ProjectPage/ProjectStatistics';
import { projectsLink } from '../components/utils';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { AddProjectPage as IAddProjectPage } from './__generated__/AddProjectPage';
import { Input, Form, Button, List } from 'antd';
import styled from 'styled-components';
import RightAlignBox from '../components/RightAlignBox';
import { CreateProjectMutation, CreateProjectMutationVariables } from './__generated__/CreateProjectMutation';
import { Redirect } from 'react-router';
import paths from '../paths';
const ADD_PROJECT_PAGE = gql`
    query AddProjectPage {
        me {
            ...NavBar
            id
        }
    }
    ${NAVBAR_FRAGMENT}
`;

const CREATE_PROJECT = gql`
    mutation CreateProjectMutation($projectInput: ProjectInput!) {
        createProject(project: $projectInput) {
            id
            name
            description
            privateApiKey
        }
    }
`;

const AddProjectPage: FunctionComponent = () => {
    const { loading, data, error } = useQuery<IAddProjectPage>(ADD_PROJECT_PAGE);
    const [createProject, { data: mutationData, error: mutationError }] = useMutation<
        CreateProjectMutation,
        CreateProjectMutationVariables
    >(CREATE_PROJECT);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<undefined | { [field: string]: string[] }>(undefined);

    const handleOnAddButtonClick = () => {
        createProject({ variables: { projectInput: { name, description } } });
    };
    if (!data) return null;
    if (!data.me) return null;
    if (mutationData && mutationData.createProject)
        return (
            <>
                Loading stuff
                <Redirect to={`/project/${mutationData.createProject.id}`} />
            </>
        );
    return (
        <>
            <NavBar
                path={[
                    projectsLink,
                    {
                        label: 'Add a new project',
                    },
                ]}
                {...data.me}
            />
            <PageContentWrapper>
                <Text fontSize={48}>Add a new project</Text>

                <Card my={3}>
                    <Flex>
                        <Box p={4}>
                            <Input
                                size="large"
                                placeholder="Project Name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                            {/*{mutationError && mutationError && <p>{mutationError.name[0]}</p>}*/}
                            <Input
                                size="large"
                                placeholder="Project Description"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                            {/*{mutationError && mutationError.description && <p>{mutationError.description[0]}</p>}*/}
                            <RightAlignBox mt={3}>
                                <Button
                                    onClick={handleOnAddButtonClick}
                                    disabled={!name}
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
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
export default AddProjectPage;
