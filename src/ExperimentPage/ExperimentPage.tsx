import React, { FunctionComponent, Props, useState } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ExperimentPage as IExperimentPage, ExperimentPageVariables } from './__generated__/ExperimentPage';
import ExperimentStatistics from './ExperimentStatistics';
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
`;

const ExperimentPage: FunctionComponent<ExperimentPageVariables> = ({ projectId, experimentId }) => {
    const { loading, data, error } = useQuery<IExperimentPage, ExperimentPageVariables>(EXPERIMENT_PAGE, {
        variables: { projectId, experimentId },
    });

    const [modifyVariants, setModifyVariants] = useState<IVariantCard[] | []>([]);

    const onDeleteVariantClick = (variant: IVariantCard) => {
        const newVariants = modifyVariants.filter(variant_ => variant_.id !== variant.id);
        setModifyVariants(newVariants);
    };

    //What to pass to this function
    // const onVariantUpdate = (id: string, change: any) => {
    //     const variant = modifyVariants.find(variant => variant.id === id);
    //
    //     const otherVariants = modifyVariants.filter(variant => variant.id === id);
    //
    //     const x: IVariantCard[] = [...otherVariants, changedVariant];
    //
    //     setModifyVariants([...otherVariants, changedVariant]);
    // };

    const onAddVariantClick = () => {
        const newCard: IVariantCard = {
            id: [...modifyVariants].length.toString(),
            name: '',
            description: '',
            readableUniqueIdentifier: '',
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
                    <Button size="large" type="primary">
                        EDIT
                    </Button>
                </Flex>

                <Text fontSize={48}>{name}</Text>
                <Text fontSize={10}>{experimentId}</Text>

                <CategoryBar title="variants" />
                <CategoryBar title="variants" addButtonHook={onAddVariantClick} />
                <Flex flexWrap="wrap" mx={-2}>
                    {([...variants, ...modifyVariants] || []).map((variant: IVariantCard) => (
                        <VariantCard
                            name={variant.name}
                            experimentId={experimentId}
                            description={variant.description}
                            readableUniqueIdentifier={variant.readableUniqueIdentifier}
                            __typename={'VariantType'}
                            id={variant.readableUniqueIdentifier}
                            onDelete={() => onDeleteVariantClick(variant)}
                            // onUpdate={(change: any) => onVariantUpdate(id, change)}
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
                    <ExperimentStatistics />
                </Card>
                <CategoryBar title="Event Results" />
                <Card cardProps={{ p: 4 }} width={[1]}>
                    <EventChart {...data.project.experiment} />
                </Card>

                <CategoryBar title="questions" />
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
