/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EventChart
// ====================================================

export interface EventChart_variants {
  __typename: "VariantType";
  id: any | null;
  name: string;
}

export interface EventChart_events_results {
  __typename: "EventResultType";
  count: number;
  id: any | null;
  variantId: any | null;
}

export interface EventChart_events {
  __typename: "EventType";
  id: any | null;
  name: string;
  results: EventChart_events_results[];
}

export interface EventChart {
  __typename: "ExperimentType";
  variants: EventChart_variants[];
  events: EventChart_events[];
}
