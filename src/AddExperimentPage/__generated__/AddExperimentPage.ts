/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AddExperimentPage
// ====================================================

export interface AddExperimentPage_me_project {
  __typename: "ProjectType";
  name: string;
  id: any;
}

export interface AddExperimentPage_me {
  __typename: "UserType";
  project: AddExperimentPage_me_project | null;
  name: string;
  id: any;
}

export interface AddExperimentPage {
  me: AddExperimentPage_me | null;
}

export interface AddExperimentPageVariables {
  projectId: string;
}
