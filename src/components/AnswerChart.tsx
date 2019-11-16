import { ResponsiveBar } from '@nivo/bar';

import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';
import useDimensions from 'react-use-dimensions';

const AnswerChart: FunctionComponent = () => {
    return (
        <div style={{ width: 400, height: 400 }}>
            <ResponsiveBar
                data={[
                    {
                        question: 'question1',
                        yes: 62,
                        no: 38,
                    },
                    {
                        question: 'question2',
                        sad: 10,
                        medium: 40,
                        happy: 50,
                    },
                ]}
                keys={['yes', 'no', 'sad', 'medium', 'happy']}
                indexBy="question"
                margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
                padding={0.2}
                innerPadding={1}
                colors={{ scheme: 'nivo' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '% of sessions',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                layout="horizontal"
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'variants',
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
    );
};

export default AnswerChart;
