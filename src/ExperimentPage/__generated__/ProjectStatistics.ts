/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectStatistics
// ====================================================

export interface ProjectStatistics_events_results {
  __typename: "EventResultType";
  count: number;
  id: any | null;
  variantId: any | null;
}

export interface ProjectStatistics_events {
  __typename: "EventType";
  id: any | null;
  name: string;
  results: ProjectStatistics_events_results[];
}

export interface ProjectStatistics {
  __typename: "ExperimentType";
  events: ProjectStatistics_events[];
}
