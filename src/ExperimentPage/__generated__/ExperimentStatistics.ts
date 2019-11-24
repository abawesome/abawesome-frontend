/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExperimentStatistics
// ====================================================

export interface ExperimentStatistics_events_results {
  __typename: "EventResultType";
  count: number;
  id: any | null;
  variantId: any | null;
}

export interface ExperimentStatistics_events {
  __typename: "EventType";
  id: any | null;
  name: string;
  results: ExperimentStatistics_events_results[];
}

export interface ExperimentStatistics {
  __typename: "ExperimentType";
  usersTested: number;
  events: ExperimentStatistics_events[];
}
