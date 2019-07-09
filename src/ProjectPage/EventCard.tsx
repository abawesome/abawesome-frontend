import React, { FunctionComponent } from 'react';
import { Card as RebassCard, CardProps, BoxProps, Box } from 'rebass';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { EventCard as IEventCard } from './__generated__/EventCard';
import Card from '../components/Card';
import { Text } from 'rebass';

export const EVENT_CARD_FRAGMENT = gql`
    fragment EventCard on EventType {
        name
        id
        readableEventId
    }
`;

const EventCard: FunctionComponent<IEventCard> = ({ id, name, readableEventId }) => {
    return (
        <Card p={2}>
            <Text fontSize={20}>{name}</Text>
            <Text fontSize={14}>{readableEventId}</Text>
        </Card>
    );
};

export default EventCard;
