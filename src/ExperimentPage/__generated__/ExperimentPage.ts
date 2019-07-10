/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExperimentPage
// ====================================================

export interface ExperimentPage_me_project_experiment_variants {
  __typename: "VariantType";
  name: string;
  id: any;
  readableVariantId: string;
}

export interface ExperimentPage_me_project_experiment {
  __typename: "ExperimentType";
  id: any;
  name: string;
  variants: ExperimentPage_me_project_experiment_variants[];
}

export interface ExperimentPage_me_project {
  __typename: "ProjectType";
  experiment: ExperimentPage_me_project_experiment | null;
  name: string;
  id: any;
}

export interface ExperimentPage_me {
  __typename: "UserType";
  project: ExperimentPage_me_project | null;
  name: string;
  id: any;
}

export interface ExperimentPage {
  me: ExperimentPage_me | null;
}

export interface ExperimentPageVariables {
  projectId: string;
  experimentId: string;
}
