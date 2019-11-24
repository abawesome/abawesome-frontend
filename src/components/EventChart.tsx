/* eslint-disable @typescript-eslint/camelcase */
import { ResponsiveBar } from '@nivo/bar';

import React, { FunctionComponent } from 'react';
import { Box, Flex, Text } from 'rebass';
import gql from 'graphql-tag';
import { EventChart as IEventChart, EventChart_events_results } from './__generated__/EventChart';

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
    const displayedCountResults = (
        events.find(e => e.name === 'AUTO__VariantDisplayed') || { results: [] as EventChart_events_results[] }
    ).results;
    const getValues = () =>
        variants.map(variant => ({
            ...events
                .filter(e => !e.name.startsWith('AUTO'))
                .reduce((obj, event, index) => {
                    const response = event.results.find(r => r.variantId === variant.id);
                    const variantDisplayed = displayedCountResults.find(r => r.variantId === variant.id);
                    if (!response || !variantDisplayed) return obj;
                    obj[event.name] = ((response.count / variantDisplayed.count) * 100).toFixed(2);
                    return obj;
                }, {}),
            variant: variant.name,
        }));

    return (
        <>
            <div style={{ width: '100%', height: 100 + variants.length * 100 }}>
                <ResponsiveBar
                    data={getValues()}
                    keys={events.map(event => event.name)}
                    indexBy="variant"
                    groupMode="grouped"
                    margin={{ top: 50, right: 200, bottom: 100, left: 70 }}
                    padding={0.2}
                    innerPadding={1}
                    colors={COLORS}
                    axisTop={null}
                    axisRight={null}
                    layout="horizontal"
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: 'Variant',
                        legendPosition: 'middle',
                        legendOffset: -60,
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Event occurence (% of sessions)',
                        legendPosition: 'middle',
                        legendOffset: 60,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', -5]] }}
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
                    labelFormat={x => `${Number(x)}%`}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        </>
    );
};

export default EventChart;
