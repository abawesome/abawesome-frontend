/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectPage
// ====================================================

export interface ProjectPage_me_project_experiments {
  __typename: "ExperimentType";
  id: any;
  name: string;
  readableExperimentId: string;
}

export interface ProjectPage_me_project_events {
  __typename: "EventType";
  name: string;
  id: any;
  readableEventId: string;
}

export interface ProjectPage_me_project {
  __typename: "ProjectType";
  id: any;
  name: string;
  experiments: ProjectPage_me_project_experiments[];
  events: ProjectPage_me_project_events[];
}

export interface ProjectPage_me {
  __typename: "UserType";
  project: ProjectPage_me_project | null;
  name: string;
  id: any;
}

export interface ProjectPage {
  me: ProjectPage_me | null;
}

export interface ProjectPageVariables {
  projectId: string;
}
