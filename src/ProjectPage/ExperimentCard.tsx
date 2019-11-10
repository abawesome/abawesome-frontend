import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { ExperimentCard as IExperimentCard } from './__generated__/ExperimentCard';
import Card from '../components/Card';
import { Text } from 'rebass';
import { Link, NavLink } from 'react-router-dom';
import StylelessLink from '../components/StylelessLink';

export const EXPERIMENT_CARD_FRAGMENT = gql`
    fragment ExperimentCard on ExperimentType {
        id
        name
    }
`;

interface Props extends IExperimentCard {
    projectId: string;
}

const ExperimentCard: FunctionComponent<Props> = ({ id, name, projectId }) => {
    return (
        <StylelessLink to={`${projectId}/experiment/${id}`}>
            <Card p={2}>
                <Text fontSize={20}>{name}</Text>
            </Card>
        </StylelessLink>
    );
};

export default ExperimentCard;
