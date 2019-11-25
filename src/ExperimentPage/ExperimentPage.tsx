import React, { FunctionComponent, Props, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
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
import { EventCard as IEventCard } from './__generated__/EventCard';

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
                    description
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

const CREATE_VARIANT = gql`
    mutation createVariantMutation($variant: VariantInput!, $experimentId: String!) {
        createVariant(variant: $variant, experimentId: $experimentId) {
            id
        }
    }
`;

const REMOVE_VARIANT = gql`
    mutation removeVariantMutation($variantId: String!) {
        removeVariant(variantId: $variantId)
    }
`;

const CREATE_EVENT = gql`
    mutation createEventMutation($event: EventInput!, $experimentId: String!) {
        createEvent(event: $event, experimentId: $experimentId) {
            id
        }
    }
`;

const REMOVE_EVENT = gql`
    mutation removeEventMutation($eventId: String!) {
        removeEvent(eventId: $eventId)
    }
`;

const ExperimentPage: FunctionComponent<ExperimentPageVariables> = ({ projectId, experimentId }) => {
    const { loading, data, refetch, error } = useQuery<IExperimentPage, ExperimentPageVariables>(EXPERIMENT_PAGE, {
        variables: { projectId, experimentId },
    });
    const [createVariant, { data: mutationData, error: mutationError }] = useMutation(CREATE_VARIANT);
    const [removeVariant, { data: mutationDeleteData, error: mutationDeleteError }] = useMutation(REMOVE_VARIANT);
    const [modifyVariants, setModifyVariants] = useState<IVariantCard[] | []>([]);

    const [createEvent, { data: createEventData, error: createEventError }] = useMutation(CREATE_EVENT);
    const [removeEvent, { data: eventDeleteData, error: mutationEventDeleteError }] = useMutation(REMOVE_EVENT);
    const [modifyEvents, setModifyEvents] = useState<IEventCard[] | []>([]);

    const [editableMode, setEditableMode] = useState<boolean>(false);

    const onDeleteVariantClick = (variant: IVariantCard) => {
        const newVariants = modifyVariants.filter(variant_ => variant_.id !== variant.id);
        setModifyVariants(newVariants);
    };

    const onDeleteEventClick = (id: string) => {
        console.log(modifyEvents);
        const newEvents = modifyEvents.filter(event_ => event_.id !== id);
        setModifyEvents(newEvents);
        console.log(modifyEvents);
    };

    const onSave = async (
        modifyVariants: IVariantCard[],
        oldVariants: IVariantCard[],
        modifyEvents: IEventCard[],
        oldEvents: IEventCard[],
    ) => {
        console.log(modifyVariants);
        const newVariants: IVariantCard[] = modifyVariants.filter(variant => variant.id.length < 2);
        await Promise.all(
            newVariants.map(variant =>
                createVariant({
                    variables: {
                        experimentId: experimentId,
                        variant: {
                            name: variant.name,
                            description: variant.description,
                        },
                    },
                }),
            ),
        );
        const oldVariantIds: string[] = modifyVariants.filter(variant => variant.id.length > 2).map(value => value.id);
        const deletedVariants: IVariantCard[] = oldVariants.filter(variant => !oldVariantIds.includes(variant.id));
        await Promise.all(
            deletedVariants.map(variant =>
                removeVariant({
                    variables: {
                        variantId: variant.id,
                    },
                }),
            ),
        );
        const newEvents: IEventCard[] = modifyEvents.filter(event => event.id.length < 2);
        await Promise.all(
            newEvents.map(event =>
                createEvent({
                    variables: {
                        experimentId: experimentId,
                        event: {
                            name: event.name,
                            description: event.description
                        },
                    },
                }),
            ),
        );
        const oldEventsIds: string[] = modifyEvents.filter(event => event.id.length > 2).map(event => event.id);
        const deletedEvents: IEventCard[] = oldEvents.filter(event => !oldEventsIds.includes(event.id));
        await Promise.all(
            deletedEvents.map(event =>
                removeEvent({
                    variables: {
                        eventId: event.id,
                    },
                }),
            ),
        );
        refetch();
        console.log(data);
    };

    const onVariantUpdate = (id: string, change: Partial<IVariantCard>) => {
        const index = modifyVariants.findIndex(value => value.id == id);
        if (index === undefined) return; //Should throw error
        setModifyVariants([
            ...modifyVariants.slice(0, index),
            { ...modifyVariants[index], ...change },
            ...modifyVariants.slice(index + 1),
        ]);
    };

    const onEventUpdate = (id: string, change: Partial<IEventCard>) => {
        const index = modifyEvents.findIndex(value => value.id == id);
        if (index === undefined) return; //Should throw error
        setModifyEvents([
            ...modifyEvents.slice(0, index),
            { ...modifyEvents[index], ...change },
            ...modifyEvents.slice(index + 1),
        ]);
    };

    const onAddVariantClick = () => {
        const newCard: IVariantCard = {
            id: modifyVariants.length.toString(),
            name: '',
            description: '',
            __typename: 'VariantType',
        };
        setModifyVariants([...modifyVariants, newCard]);
    };

    const onAddEventClick = () => {
        const newEvent: IEventCard = {
            id: modifyVariants.length.toString(),
            name: '',
            description: '',
            __typename: 'EventType',
        };
        setModifyEvents([...modifyEvents, newEvent]);
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
                <Flex px={0}>
                    <Text fontSize={48} marginLeft={-8}>
                        {name}
                    </Text>
                    <Box mx="auto" />
                    {!editableMode && (
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => {
                                setModifyVariants(variants);
                                setModifyEvents(events);
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
                                onSave(modifyVariants, variants, modifyEvents, events);
                            }}
                        >
                            SAVE
                        </Button>
                    )}
                    {editableMode && (
                        <Button
                            style={{
                                marginLeft: 10,
                                marginRight: -5,
                            }}
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
                            editableMode={editableMode}
                            experimentId={experimentId}
                            onDelete={() => onDeleteVariantClick(variant)}
                            onUpdate={onVariantUpdate}
                        />
                    ))}
                </Flex>
                <CategoryBar title="events" addButtonHook={editableMode ? onAddEventClick : undefined} />
                <Flex flexWrap="wrap" mx={-2}>
                    {(editableMode ? [...modifyEvents] : [...events])
                        .filter(event => !event.name.startsWith('AUTO__'))
                        .map(event => (
                            <EventCard
                                {...event}
                                onDelete={() => onDeleteEventClick(event.id)}
                                onUpdate={onEventUpdate}
                                editableMode={editableMode}
                            />
                        ))}
                </Flex>
                <CategoryBar title="questions" addButtonHook={editableMode ? onAddVariantClick : undefined} />
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
