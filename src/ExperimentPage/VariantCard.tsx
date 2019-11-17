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
        description
    }
`;

const VariantCard: FunctionComponent<IVariantCard> = ({ id, name, description }) => {
    return (
        <Card p={2} width={1 / 3}>
            <Text fontSize={20}>{name}</Text>
            <Text fontSize={14}>{description}</Text>
        </Card>
    );
};

export default VariantCard;
