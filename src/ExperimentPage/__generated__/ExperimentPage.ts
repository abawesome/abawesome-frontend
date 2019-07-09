/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExperimentPage
// ====================================================

export interface ExperimentPage_me_project_experiment {
  __typename: "ExperimentType";
  id: any;
  name: string;
}

export interface ExperimentPage_me_project {
  __typename: "ProjectType";
  experiment: ExperimentPage_me_project_experiment | null;
  id: any;
}

export interface ExperimentPage_me {
  __typename: "UserType";
  project: ExperimentPage_me_project | null;
  id: string;
}

export interface ExperimentPage {
  me: ExperimentPage_me | null;
}

export interface ExperimentPageVariables {
  projectId: string;
  experimentId: string;
}
