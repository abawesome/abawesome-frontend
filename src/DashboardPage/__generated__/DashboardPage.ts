/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardPage
// ====================================================

export interface DashboardPage_me_projects {
  __typename: "ProjectType";
  readableProjectId: string;
  name: string;
  id: any;
}

export interface DashboardPage_me {
  __typename: "UserType";
  projects: DashboardPage_me_projects[];
  name: string;
  id: any;
}

export interface DashboardPage {
  me: DashboardPage_me | null;
}
