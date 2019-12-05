import React, { FunctionComponent } from 'react';
import { Card as RebassCard, CardProps, BoxProps, Box, Flex } from 'rebass';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { QuestionCard as IQuestionCard } from './__generated__/QuestionCard';
import Card from '../components/Card';
import { Text } from 'rebass';
import RightAlignBox from '../components/RightAlignBox';
import { Button, Input, Select } from 'antd';
import { EventCard as IEventCard } from './__generated__/EventCard';
import { QuestionKind } from '../__generated__/graphql-global-types';
import TextArea from 'antd/es/input/TextArea';

export const QUESTION_CARD_FRAGMENT = gql`
    fragment QuestionCard on QuestionType {
        id
        name
        description
        kind
    }
`;

interface Props extends IQuestionCard {
    onDelete: any;
    onUpdate: (id: string, change: Partial<IQuestionCard>) => void;
    editableMode: boolean;
}

const QuestionCard: FunctionComponent<Props> = ({ id, name, description, kind, editableMode, onUpdate, onDelete }) => {
    return (
        <Card p={2} width={1 / 3}>
            <Flex>
                {editableMode && (
                    <>
                        <Box mx="auto" />
                        <RightAlignBox padding={0}>
                            <Button shape="circle" icon="delete" size={'small'} onClick={onDelete} />
                        </RightAlignBox>
                    </>
                )}
            </Flex>
            {editableMode && (
                <Input
                    size="large"
                    placeholder="Question Name"
                    value={name}
                    onChange={event => onUpdate(id, { name: event.target.value })}
                />
            )}
            {!editableMode && <Text fontSize={20}>{name}</Text>}

            {!editableMode && <Text fontSize={14}>{kind === 'YES_NO' ? 'Yes or no' : 'Rating'}</Text>}
            {editableMode && (
                <Box mt={2}>
                    <Select
                        style={{ width: 120 }}
                        onChange={(event: string) =>
                            onUpdate(id, {
                                kind:
                                    event == QuestionKind.YES_NO.toString() ? QuestionKind.YES_NO : QuestionKind.RATING,
                            })
                        }
                        value={kind === 'YES_NO' ? 'Yes or no' : 'Rating'}
                    >
                        <Select.Option value={QuestionKind.RATING}>Rating</Select.Option>
                        <Select.Option value={QuestionKind.YES_NO}>Yes/No</Select.Option>
                    </Select>
                </Box>
            )}
            {editableMode && (
                <TextArea
                    rows={2}
                    placeholder="Question Description"
                    value={description || ''}
                    onChange={event => onUpdate(id, { description: event.target.value })}
                />
            )}
            {!editableMode && description !== '' && <Text>{description}</Text>}
            {!editableMode && description === '' && <Text color={'grey'}>No description provided</Text>}
            {id.length > 3 && (
                <Flex>
                    <Box mx="auto" />
                    <Text marginTop={2} color={'grey'} fontSize={10}>
                        id: {id}
                    </Text>
                </Flex>
            )}
        </Card>
    );
};

export default QuestionCard;
