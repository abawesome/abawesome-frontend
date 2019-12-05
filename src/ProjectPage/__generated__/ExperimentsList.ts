/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExperimentsList
// ====================================================

export interface ExperimentsList_experiments {
  __typename: "ExperimentType";
  id: any | null;
  name: string;
  description: string | null;
}

export interface ExperimentsList {
  __typename: "ProjectType";
  /**
   * Experiments in the project
   */
  experiments: ExperimentsList_experiments[];
}
