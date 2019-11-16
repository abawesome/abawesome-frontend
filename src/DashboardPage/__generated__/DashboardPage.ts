/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardPage
// ====================================================

export interface DashboardPage_me_projects {
  __typename: "ProjectType";
  name: string;
  id: any | null;
  description: string | null;
}

export interface DashboardPage_me {
  __typename: "UserType";
  /**
   * Projects belonging to user
   */
  projects: DashboardPage_me_projects[];
  userName: string;
  id: any | null;
}

export interface DashboardPage {
  me: DashboardPage_me | null;
}
