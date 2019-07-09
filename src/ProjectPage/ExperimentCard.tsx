import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { ExperimentCard as IExperimentCard } from './__generated__/ExperimentCard';
import Card from '../components/Card';
import { Text } from 'rebass';
import { Link, NavLink } from 'react-router-dom';

export const EXPERIMENT_CARD_FRAGMENT = gql`
    fragment ExperimentCard on ExperimentType {
        id
        name
        readableExperimentId
    }
`;

interface Props extends IExperimentCard {
    expanded: boolean;
}

const ExperimentCard: FunctionComponent<Props> = ({ id, name, readableExperimentId, expanded }) => {
    return (
        <NavLink to={`experiment/${readableExperimentId}`}>
            <Card p={2}>
                <Text fontSize={20}>{name}</Text>
                <Text fontSize={14}>{readableExperimentId}</Text>
            </Card>
        </NavLink>
    );
};

export default ExperimentCard;
