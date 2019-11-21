import { ResponsiveBar } from '@nivo/bar';

import React, { FunctionComponent } from 'react';
import { Box, Flex, Text } from 'rebass';
import styled from 'styled-components';
import useDimensions from 'react-use-dimensions';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// eslint-disable-next-line @typescript-eslint/camelcase
import { AnswerChart as IAnswerChart, AnswerChart_questions } from './__generated__/AnswerChart';
import { QuestionKind } from '../__generated__/graphql-global-types';
import { COLORS } from './EventChart';

export const ANSWER_CHART_FRAGMENT = gql`
    fragment AnswerChart on ExperimentType {
        variants {
            id
            name
        }
        questions {
            id
            name
            kind
            results {
                answer
                count
                id
                variantId
            }
        }
    }
`;

const AnswerChart: FunctionComponent<IAnswerChart> = ({ questions, variants }) => {
    const getKeysForQuestion = (kind: QuestionKind | null) => {
        if (kind === 'RATING') {
            return ['😩 unhappy', '😟rather unhappy', '😐no opinion', '😊rather happy', '😄happy'];
        }
        if (kind === 'YES_NO') {
            return ['YES', 'NO'];
        }
        return [];
    };
    // eslint-disable-next-line @typescript-eslint/camelcase
    const getValuesForQuestion = (question: AnswerChart_questions) =>
        variants.map(variant => ({
            ...getKeysForQuestion(question.kind).reduce((obj, key, index) => {
                const response = question.results.find(r => r.answer === index && r.variantId === variant.id);
                if (!response) return obj;
                obj[key] = response.count;
                return obj;
            }, {}),
            variant: variant.name,
        }));

    return (
        <>
            {questions
                .filter(q => q.kind)
                .map(question => (
                    <>
                        <Text fontSize={24}>{question.name}</Text>
                        <div style={{ width: '100%', height: 50 + variants.length * 100 }}>
                            <ResponsiveBar
                                data={getValuesForQuestion(question)}
                                keys={getKeysForQuestion(question.kind as QuestionKind)}
                                indexBy="variant"
                                margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
                                padding={0.2}
                                innerPadding={1}
                                colors={COLORS}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={null}
                                layout="horizontal"
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: -45,
                                    legend: 'variant',
                                    legendPosition: 'middle',
                                    legendOffset: -60,
                                }}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                legends={[
                                    {
                                        dataFrom: 'keys',
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 120,
                                        translateY: 0,
                                        itemsSpacing: 2,
                                        itemWidth: 100,
                                        itemHeight: 20,
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 0.85,
                                        symbolSize: 20,
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemOpacity: 1,
                                                },
                                            },
                                        ],
                                    },
                                ]}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                            />
                        </div>
                    </>
                ))}
        </>
    );
};

export default AnswerChart;
