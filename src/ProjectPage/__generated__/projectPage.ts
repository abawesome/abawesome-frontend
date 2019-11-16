/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectPage
// ====================================================

export interface ProjectPage_me_project_experiments {
  __typename: "ExperimentType";
  id: string | null;
  name: string;
  description: string;
}

export interface ProjectPage_me_project {
  __typename: "ProjectType";
  id: string | null;
  name: string;
  /**
   * Experiments in the project
   */
  experiments: (ProjectPage_me_project_experiments | null)[] | null;
}

export interface ProjectPage_me {
  __typename: "UserType";
  /**
   * Get project by Id if belongs to user
   */
  project: ProjectPage_me_project | null;
  userName: string;
  id: string | null;
}

export interface ProjectPage {
  me: ProjectPage_me | null;
}

export interface ProjectPageVariables {
  projectId: string;
}
