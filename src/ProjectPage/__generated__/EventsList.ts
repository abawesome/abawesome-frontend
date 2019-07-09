/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EventsList
// ====================================================

export interface EventsList_events {
  __typename: "EventType";
  name: string;
  id: any;
  readableEventId: string;
}

export interface EventsList {
  __typename: "ProjectType";
  events: EventsList_events[];
}
