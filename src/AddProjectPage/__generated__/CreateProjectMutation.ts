/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProjectInput } from "./../../__generated__/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateProjectMutation
// ====================================================

export interface CreateProjectMutation_createProject {
  __typename: "ProjectType";
  name: string;
  description: string | null;
  privateApiKey: string | null;
}

export interface CreateProjectMutation {
  createProject: CreateProjectMutation_createProject | null;
}

export interface CreateProjectMutationVariables {
  projectInput: ProjectInput;
}
