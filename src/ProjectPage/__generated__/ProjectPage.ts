/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectPage
// ====================================================

export interface ProjectPage_me_project_experiments {
  __typename: "ExperimentType";
  id: any | null;
  name: string;
}

export interface ProjectPage_me_project {
  __typename: "ProjectType";
  id: any | null;
  name: string;
  description: string | null;
  /**
   * Experiments in the project
   */
  experiments: ProjectPage_me_project_experiments[];
}

export interface ProjectPage_me {
  __typename: "UserType";
  /**
   * Project belonging to user by project id
   */
  project: ProjectPage_me_project | null;
  userName: string;
  id: any | null;
}

export interface ProjectPage {
  me: ProjectPage_me | null;
}

export interface ProjectPageVariables {
  projectId: string;
}
