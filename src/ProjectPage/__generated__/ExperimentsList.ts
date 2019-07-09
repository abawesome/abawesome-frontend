/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExperimentsList
// ====================================================

export interface ExperimentsList_experiments {
  __typename: "ExperimentType";
  id: any;
  name: string;
  readableExperimentId: string;
}

export interface ExperimentsList {
  __typename: "ProjectType";
  experiments: ExperimentsList_experiments[];
}
