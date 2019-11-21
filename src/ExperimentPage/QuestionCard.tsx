import React, { FunctionComponent } from 'react';
import { Card as RebassCard, CardProps, BoxProps, Box } from 'rebass';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { QuestionCard as IQuestionCard } from './__generated__/QuestionCard';
import Card from '../components/Card';
import { Text } from 'rebass';

export const QUESTION_CARD_FRAGMENT = gql`
    fragment QuestionCard on QuestionType {
        id
        name
        kind
    }
`;

const QuestionCard: FunctionComponent<IQuestionCard> = ({ id, name, kind }) => {
    return (
        <Card p={2} width={1 / 3}>
            <Text fontSize={20}>{name}</Text>
            <Text fontSize={14}>{kind === 'YES_NO' ? 'Yes or no' : 'Rating'}</Text>
            <Text fontSize={10}>{id}</Text>
        </Card>
    );
};

export default QuestionCard;
