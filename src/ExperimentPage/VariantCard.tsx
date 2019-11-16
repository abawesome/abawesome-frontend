import React, { FunctionComponent } from 'react';
import { Card as RebassCard, CardProps, BoxProps, Box } from 'rebass';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { VariantCard as IVariantCard } from './__generated__/VariantCard';
import Card from '../components/Card';
import { Text } from 'rebass';
import { ExperimentCard as IExperimentCard } from '../ProjectPage/__generated__/ExperimentCard';

export const VARIANT_CARD_FRAGMENT = gql`
    fragment VariantCard on VariantType {
        id
        name
    }
`;

interface Props extends IVariantCard {
    experimentId: string;
}

const VariantCard: FunctionComponent<Props> = ({ id, name }) => {
    return (
        <Card p={2}>
            <Text fontSize={20}>{name}</Text>
        </Card>
    );
};

export default VariantCard;
