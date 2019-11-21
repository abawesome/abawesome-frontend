/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ExperimentInput } from "./../../__generated__/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateExperiment
// ====================================================

export interface CreateExperiment_createExperiment {
  __typename: "ExperimentType";
  id: any | null;
}

export interface CreateExperiment {
  createExperiment: CreateExperiment_createExperiment | null;
}

export interface CreateExperimentVariables {
  experiment: ExperimentInput;
  projectId: string;
}
