import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { ExperimentsList as IExperimentsList } from './__generated__/ExperimentsList';
import { Text } from 'rebass';
import ExpandableList from '../components/ExpandableList';
import ExperimentCard, { EXPERIMENT_CARD_FRAGMENT } from './ExperimentCard';

export const EXPERIMENTS_LIST_FRAGMENT = gql`
    fragment ExperimentsList on ProjectType {
        experiments {
            ...ExperimentCard
        }
    }
    ${EXPERIMENT_CARD_FRAGMENT}
`;

interface Props extends IExperimentsList {
    loading: boolean;
    projectId: string;
}

const ExperimentsList: FunctionComponent<Props> = ({ experiments, projectId }) => {
    return (
        <ExpandableList
            items={(experiments || [])
                .map(experiment => ({
                item: <ExperimentCard key={experiment && experiment.id} {...(experiment || {id:"", name:"", __typename:"ExperimentType"})} projectId={projectId} />,
            }))}
        />
    );
};

export default ExperimentsList;
