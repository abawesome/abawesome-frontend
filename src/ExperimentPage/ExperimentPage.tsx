import React, { FunctionComponent, Props, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ExperimentPage as IExperimentPage, ExperimentPageVariables } from './__generated__/ExperimentPage';
import { VariantCard as IVariantCard } from './__generated__/VariantCard';
import ExperimentStatistics, { EXPERIMENT_STATISTICS_FRAGMENT } from './ExperimentStatistics';
import { projectsLink } from '../components/utils';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { Button } from 'antd';
import EventChart, { EVENT_CHART_FRAGMENT } from '../components/EventChart';
import AnswerChart, { ANSWER_CHART_FRAGMENT } from '../components/AnswerChart';
import VariantCard from './VariantCard';
import EventCard from './EventCard';
import QuestionCard from './QuestionCard';

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
                questions {
                    name
                    id
                    kind
                }
                events {
                    name
                    id
                }
                ...AnswerChart
                ...EventChart
                ...ExperimentStatistics
            }
            name
            id
        }
        me {
            ...NavBar
        }
    }
    ${ANSWER_CHART_FRAGMENT}
    ${EVENT_CHART_FRAGMENT}
    ${NAVBAR_FRAGMENT}
    ${EXPERIMENT_STATISTICS_FRAGMENT}
`;

const ExperimentPage: FunctionComponent<ExperimentPageVariables> = ({ projectId, experimentId }) => {
    const { loading, data, error } = useQuery<IExperimentPage, ExperimentPageVariables>(EXPERIMENT_PAGE, {
        variables: { projectId, experimentId },
    });

    const [modifyVariants, setModifyVariants] = useState<IVariantCard[] | []>([]);
    const [editableMode, setEditableMode] = useState<boolean>(false);

    const onDeleteVariantClick = (variant: IVariantCard) => {
        const newVariants = modifyVariants.filter(variant_ => variant_.id !== variant.id);
        setModifyVariants(newVariants);
    };

    const onVariantUpdate = (id: string, change: Partial<IVariantCard>) => {
        const index = modifyVariants.findIndex(value => value.id == id);
        if (index === undefined) return; //Should throw error
        console.log(modifyVariants);
        console.log(index);
        console.log(change);
        console.log([...modifyVariants.slice(0, index)]);
        console.log({ ...modifyVariants[index], ...change });
        console.log([...modifyVariants.slice(index + 1)]);
        console.log('---------------------------------------');
        setModifyVariants([
            ...modifyVariants.slice(0, index),
            { ...modifyVariants[index], ...change },
            ...modifyVariants.slice(index + 1),
        ]);
    };

    const onAddVariantClick = () => {
        const newCard: IVariantCard = {
            id: modifyVariants.length,
            name: '',
            description: '',
            __typename: 'VariantType',
        };
        setModifyVariants([...modifyVariants, newCard]);
    };

    const onAddQuestionClick = () => {
        const newCard: IVariantCard = {
            id: modifyVariants.length,
            name: '',
            description: '',
            __typename: 'VariantType',
        };
        setModifyVariants([...modifyVariants, newCard]);
    };

    if (!data || !data.project || !data.me || !data.project.experiment) return null;
    if (!data.project.experiment) return null;
    const { name, variants, events, questions } = data.project.experiment;
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
                <Flex px={2}>
                    <Text fontSize={48}>{name}</Text>
                    <Box mx="auto" />
                    {!editableMode && (
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => {
                                setModifyVariants(variants);
                                setEditableMode(true);
                            }}
                        >
                            EDIT
                        </Button>
                    )}
                    {editableMode && (
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => {
                                setEditableMode(false);
                            }}
                        >
                            SAVE
                        </Button>
                    )}
                    {editableMode && (
                        <Button
                            size="large"
                            type="danger"
                            onClick={() => {
                                setEditableMode(false);
                                setModifyVariants([]);
                            }}
                        >
                            DISCARD
                        </Button>
                    )}
                </Flex>

                <Text fontSize={10}>{experimentId}</Text>

                <CategoryBar title="variants" addButtonHook={editableMode ? onAddVariantClick : undefined} />
                <Flex flexWrap="wrap" mx={-2}>
                    {(editableMode ? [...modifyVariants] : [...variants]).map((variant: IVariantCard) => (
                        <VariantCard
                            {...variant}
                            experimentId={experimentId}
                            onDelete={() => onDeleteVariantClick(variant)}
                            onUpdate={onVariantUpdate}
                        />
                    ))}
                </Flex>
                <CategoryBar title="events" />
                <Flex flexWrap="wrap" mx={-2}>
                    {(events || []).map(event => (
                        <EventCard {...event} />
                    ))}
                </Flex>
                <CategoryBar title="questions" />
                <Flex flexWrap="wrap" mx={-2}>
                    {(questions || []).map(question => (
                        <QuestionCard {...question} />
                    ))}
                </Flex>
                <CategoryBar title="stats" />
                <Card cardProps={{ p: 2 }} width={[1 / 2]}>
                    <ExperimentStatistics {...data.project.experiment} />
                </Card>
                <CategoryBar title="Event Results" />
                <Card cardProps={{ p: 4 }} width={[1]}>
                    <EventChart {...data.project.experiment} />
                </Card>

                <CategoryBar title="questions" addButtonHook={editableMode ? onAddVariantClick : undefined} />
                <Flex flexWrap="wrap" mx={-2}>
                    <Card p={2} cardProps={{ p: 4 }} width={[1]}>
                        <AnswerChart {...data.project.experiment} />
                    </Card>
                </Flex>
            </PageContentWrapper>
        </>
    );
};
export default ExperimentPage;
