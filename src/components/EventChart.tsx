import { ResponsiveBar } from '@nivo/bar';

import React, { FunctionComponent } from 'react';
import { Box, Flex, Text } from 'rebass';
import gql from 'graphql-tag';
import { EventChart as IEventChart } from './__generated__/EventChart';

export const COLORS = ['#2a4d69', '#4b86b4', '#adcbe3', '#e7eff6', '#b3cde0', '#63ace5'];

export const EVENT_CHART_FRAGMENT = gql`
    fragment EventChart on ExperimentType {
        variants {
            id
            name
        }
        events {
            id
            name
            results {
                count
                id
                variantId
            }
        }
    }
`;

const EventChart: FunctionComponent<IEventChart> = ({ events, variants }) => {
    const getValues = () =>
        variants.map(variant => ({
            ...events.reduce((obj, event, index) => {
                const response = event.results.find(r => r.variantId === variant.id);
                if (!response) return obj;
                obj[event.name] = response.count;
                return obj;
            }, {}),
            variant: variant.name,
        }));

    return (
        <>
            <div style={{ width: '100%', height: 50 + variants.length * 100 }}>
                <ResponsiveBar
                    data={getValues()}
                    keys={events.map(event => event.name)}
                    indexBy="variant"
                    groupMode="grouped"
                    margin={{ top: 50, right: 200, bottom: 50, left: 70 }}
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
                    labelTextColor={{ from: 'color', modifiers: [['darker', -2]] }}
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
    );
};

export default EventChart;
