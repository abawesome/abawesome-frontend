/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExperimentPage
// ====================================================

export interface ExperimentPage_project_experiment_variants {
  __typename: "VariantType";
  name: string;
  id: any | null;
}

export interface ExperimentPage_project_experiment {
  __typename: "ExperimentType";
  id: any | null;
  name: string;
  variants: (ExperimentPage_project_experiment_variants | null)[] | null;
}

export interface ExperimentPage_project {
  __typename: "ProjectType";
  experiment: ExperimentPage_project_experiment | null;
  name: string;
  id: any | null;
}

export interface ExperimentPage_me {
  __typename: "UserType";
  userName: string;
  id: any | null;
}

export interface ExperimentPage {
  project: ExperimentPage_project | null;
  me: ExperimentPage_me | null;
}

export interface ExperimentPageVariables {
  projectId: any;
  experimentId: any;
}
