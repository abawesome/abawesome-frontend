/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AddExperimentPage
// ====================================================

export interface AddExperimentPage_me_project {
  __typename: "ProjectType";
  name: string;
  id: any | null;
}

export interface AddExperimentPage_me {
  __typename: "UserType";
  /**
   * Project belonging to user by project id
   */
  project: AddExperimentPage_me_project | null;
  userName: string;
  id: any | null;
}

export interface AddExperimentPage {
  me: AddExperimentPage_me | null;
}

export interface AddExperimentPageVariables {
  projectId: string;
}
