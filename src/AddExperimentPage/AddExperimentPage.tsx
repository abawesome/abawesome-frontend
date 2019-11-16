import React, { FunctionComponent, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { projectsLink } from '../components/utils';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { AddExperimentPageVariables, AddExperimentPage as IAddExperimentPage } from './__generated__/AddExperimentPage';
import { CreateExperimentVariables, CreateExperiment as ICreateExperiment } from './__generated__/CreateExperiment';
import { Input, Form, Button, List, Select } from 'antd';
import RightAlignBox from '../components/RightAlignBox';
import { Redirect } from 'react-router';
import paths from '../paths';
import AddVariantItem from './AddVariantItem';
import AddQuestionItem from './AddQuestionItem';
import { useHistory } from 'react-router-dom';
import { QuestionKind } from '../__generated__/graphql-global-types';
import AddEventItem from './AddEventItem';
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
    const history = useHistory();
    const [createExperiment, { loading: mutationLoading, data: mutationData, error: mutationError }] = useMutation<
        ICreateExperiment,
        CreateExperimentVariables
    >(CREATE_EXPERIMENT);

    const [variants, setVariants] = useState<{ name: string; description: string }[]>([]);
    const [events, setEvents] = useState<{ name: string; description: string }[]>([]);
    const [questions, setQuestions] = useState<{ name: string; kind: QuestionKind }[]>([]);
    const [experimentName, setExperimentName] = useState('');
    const [experimentDescription, setExperimentDescription] = useState('');

    const onCreateClick = () => {
        createExperiment({
            variables: {
                experiment: {
                    projectId,
                    name: experimentName,
                    description: experimentDescription,
                    variants,
                    events,
                    questions,
                },
            },
        });
    };

    if (!data) return null;
    if (!data.me || !data.me.project || !data.me.project) return null;
    if (mutationData && mutationData.createExperiment) {
        return <Redirect to={`/project/${data.me.project.id}/experiment/${mutationData.createExperiment.id}`} />;
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
            <PageContentWrapper thin>
                <Text fontSize={48}>Add a new experiment</Text>

                <Card my={3} width={1} cardProps={{ p: 4 }}>
                    <Text fontSize={24}>Basic details</Text>
                    <Box width={2 / 3} mt={3}>
                        <Input
                            size="large"
                            placeholder="Experiment Name"
                            value={experimentName}
                            onChange={event => setExperimentName(event.target.value)}
                        />
                    </Box>
                    <Box mt={2} width={1}>
                        <Input.TextArea
                            placeholder="Experiment Description"
                            value={experimentDescription}
                            onChange={event => setExperimentDescription(event.target.value)}
                        />
                    </Box>
                    <Text fontSize={24} mt={4}>
                        Variants
                    </Text>
                    <Box mx={-3} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {[...variants, { name: '', description: '' }].map((variant, idx) => (
                            <Box p={3} width={1 / 2} key={idx}>
                                <AddVariantItem
                                    {...variant}
                                    newCard={idx === variants.length}
                                    setDescription={newDesc =>
                                        setVariants(
                                            variants.map((v, innerIndex) =>
                                                innerIndex === idx ? { ...v, description: newDesc } : v,
                                            ),
                                        )
                                    }
                                    setName={newName =>
                                        idx === variants.length
                                            ? setVariants([...variants, { name: newName, description: '' }])
                                            : setVariants(
                                                  variants.map((v, innerIndex) =>
                                                      innerIndex === idx ? { ...v, name: newName } : v,
                                                  ),
                                              )
                                    }
                                    onDelete={
                                        idx !== variants.length
                                            ? () => setVariants(variants.filter((v, innerIndex) => innerIndex !== idx))
                                            : undefined
                                    }
                                />
                            </Box>
                        ))}
                    </Box>
                    <Text fontSize={24} mt={4}>
                        Events
                    </Text>
                    <Box mx={-3} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {[...events, { name: '', description: '' }].map((event, idx) => (
                            <Box p={3} width={1 / 2} key={idx}>
                                <AddEventItem
                                    {...event}
                                    newCard={idx === events.length}
                                    setDescription={newDesc =>
                                        setEvents(
                                            events.map((v, innerIndex) =>
                                                innerIndex === idx ? { ...v, description: newDesc } : v,
                                            ),
                                        )
                                    }
                                    setName={newName =>
                                        idx === events.length
                                            ? setEvents([...events, { name: newName, description: '' }])
                                            : setEvents(
                                                  events.map((v, innerIndex) =>
                                                      innerIndex === idx ? { ...v, name: newName } : v,
                                                  ),
                                              )
                                    }
                                    onDelete={
                                        idx !== events.length
                                            ? () => setEvents(events.filter((v, innerIndex) => innerIndex !== idx))
                                            : undefined
                                    }
                                />
                            </Box>
                        ))}
                    </Box>
                    <Text fontSize={24} mt={4}>
                        Questions
                    </Text>
                    <Box mx={-3} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {[...questions, { name: '', kind: QuestionKind.RATING }].map((question, idx) => (
                            <Box p={3} width={1 / 2} key={idx}>
                                <AddQuestionItem
                                    {...question}
                                    newCard={idx === questions.length}
                                    setKind={newKind =>
                                        setQuestions(
                                            questions.map((v, innerIndex) =>
                                                innerIndex === idx ? { ...v, kind: newKind } : v,
                                            ),
                                        )
                                    }
                                    setName={newName =>
                                        idx === questions.length
                                            ? setQuestions([...questions, { name: newName, kind: QuestionKind.RATING }])
                                            : setQuestions(
                                                  questions.map((q, innerIndex) =>
                                                      innerIndex === idx ? { ...q, name: newName } : q,
                                                  ),
                                              )
                                    }
                                    onDelete={
                                        idx !== questions.length
                                            ? () =>
                                                  setQuestions(questions.filter((q, innerIndex) => innerIndex !== idx))
                                            : undefined
                                    }
                                />
                            </Box>
                        ))}
                    </Box>
                    <RightAlignBox>
                        <Button.Group size="large">
                            <Button onClick={() => history.replace(paths.dashboard)}>Cancel</Button>
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
