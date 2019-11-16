/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExperimentsList
// ====================================================

export interface ExperimentsList_experiments {
  __typename: "ExperimentType";
  id: string | null;
  name: string;
  description: string;
}

export interface ExperimentsList {
  __typename: "ProjectType";
  /**
   * Experiments in the project
   */
  experiments: (ExperimentsList_experiments | null)[] | null;
}
