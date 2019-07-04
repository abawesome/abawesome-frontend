/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: projectPage
// ====================================================

export interface projectPage_me_projects {
  __typename: "ProjectType";
  id: string;
}

export interface projectPage_me {
  __typename: "UserType";
  id: string;
  projects: (projectPage_me_projects | null)[] | null;
}

export interface projectPage {
  me: projectPage_me | null;
}
