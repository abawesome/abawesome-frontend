import React, { FunctionComponent } from 'react';
import Card from '../components/Card';
import gql from 'graphql-tag';
import EventCard, { EVENT_CARD_FRAGMENT } from './EventCard';
import { EventsList as IEventsList } from './__generated__/EventsList';
import ExpandableList from '../components/ExpandableList';
import { useQuery } from '@apollo/react-hooks';

export const EVENTS_LIST_FRAGMENT = gql`
    fragment EventsList on ExperimentType {
        events {
            ...EventCard
        }
    }
`;

const EventsList: FunctionComponent<IEventsList> = ({ events }) => {
    return (
        <ExpandableList
            items={events.map(event => ({ item: <EventCard key={event.id} {...event} />, expanded: false }))}
        />
    );
};

export default EventsList;