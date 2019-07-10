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
    mutation CreateProjectMutation($name: String!) {
        createProject(name: $name) {
            project {
                name
            }
        }
    }
`;

const AddProjectPage: FunctionComponent = () => {
    const { loading, data, error } = useQuery<IAddProjectPage>(ADD_PROJECT_PAGE);
    const [createProject, { data: mutationData, error: mutationError }] = useMutation<
        CreateProjectMutation,
        CreateProjectMutationVariables
    >(CREATE_PROJECT);
    const [projectInput, setprojectInput] = useState('');
    if (!data) return null;
    if (!data.me) return null;
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
                        <Box p={4} width={1 / 2}>
                            <Input
                                size="large"
                                placeholder="Project Name"
                                value={projectInput}
                                onChange={event => setprojectInput(event.target.value)}
                            />
                            <RightAlignBox mt={3}>
                                <Button
                                    onClick={() => createProject({ variables: { name: projectInput } })}
                                    disabled={!projectInput}
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Create
                                </Button>
                            </RightAlignBox>
                        </Box>
                        <Box p={4} width={1 / 2}>
                            <Text>You can include your project in your react app by using this snippet:</Text>
                        </Box>
                    </Flex>
                </Card>
            </PageContentWrapper>
        </>
    );
};
export default AddProjectPage;
