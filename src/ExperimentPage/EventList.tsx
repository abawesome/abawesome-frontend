import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import { EventCard as IEventCard } from './__generated__/EventCard';
import EventCard from './EventCard';

interface Props {
    events: IEventCard[];
    modifyEvents: IEventCard[];
    setModifyEvents: (event: IEventCard[]) => void;
    editableMode: boolean;
}

const EventsList: FunctionComponent<Props> = props => {
    const onDeleteEventClick = (event: IEventCard) => {
        const newEvents = props.modifyEvents.filter(event => event.id !== event.id);
        props.setModifyEvents(newEvents);
    };

    const onEventUpdate = (id: string, change: Partial<IEventCard>) => {
        const index = props.modifyEvents.findIndex(value => value.id == id);
        if (index === undefined) return; //Should throw error
        props.setModifyEvents([
            ...props.modifyEvents.slice(0, index),
            { ...props.modifyEvents[index], ...change },
            ...props.modifyEvents.slice(index + 1),
        ]);
    };

    const onAddEventClick = () => {
        const newEvent: IEventCard = {
            id: props.modifyEvents.length.toString(),
            name: '',
            description: '',
            __typename: 'EventType',
        };
        props.setModifyEvents([...props.modifyEvents, newEvent]);
    };

    return (
        <>
            <CategoryBar title="events" addButtonHook={props.editableMode ? onAddEventClick : undefined} />
            <Flex flexWrap="wrap" mx={-2}>
                {(props.editableMode ? props.modifyEvents : props.events)
                    .filter(event => !event.name.startsWith('AUTO__'))
                    .map((event: IEventCard) => (
                        <EventCard
                            {...event}
                            editableMode={props.editableMode}
                            onDelete={() => onDeleteEventClick(event)}
                            onUpdate={onEventUpdate}
                        />
                    ))}
            </Flex>
        </>
    );
};

export default EventsList;
