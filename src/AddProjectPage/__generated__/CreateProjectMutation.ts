/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateProjectMutation
// ====================================================

export interface CreateProjectMutation_createProject_project {
  __typename: "ProjectType";
  name: string;
}

export interface CreateProjectMutation_createProject {
  __typename: "CreateProject";
  project: CreateProjectMutation_createProject_project | null;
}

export interface CreateProjectMutation {
  createProject: CreateProjectMutation_createProject | null;
}

export interface CreateProjectMutationVariables {
  name: string;
}
