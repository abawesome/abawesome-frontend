/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EventsList
// ====================================================

export interface EventsList_events {
  __typename: "EventType";
  id: any | null;
  name: string;
}

export interface EventsList {
  __typename: "ExperimentType";
  events: EventsList_events[];
}
