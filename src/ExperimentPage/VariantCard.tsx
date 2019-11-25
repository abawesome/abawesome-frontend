import React, { FunctionComponent } from 'react';
import { Card as RebassCard, CardProps, BoxProps, Box, Image, Flex } from 'rebass';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { VariantCard as IVariantCard } from './__generated__/VariantCard';
import Card from '../components/Card';
import { Text } from 'rebass';
import { Button, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import RightAlignBox from '../components/RightAlignBox';

export const VARIANT_CARD_FRAGMENT = gql`
    fragment VariantCard on VariantType {
        id
        name
        description
    }
`;

interface Props extends IVariantCard {
    onDelete: any;
    onUpdate: (id: string, change: Partial<IVariantCard>) => void;
    editableMode: boolean;
}

const VariantCard: FunctionComponent<Props> = ({ id, name, description, onDelete, onUpdate, editableMode }) => {
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
                    placeholder="Variant Name"
                    value={name}
                    onChange={event => onUpdate(id, { name: event.target.value })}
                />
            )}
            {!editableMode && (
                <Text fontSize={3}>
                    {name}
                </Text>
            )}
            {editableMode && (
                <TextArea
                    rows={2}
                    placeholder="Variant Description"
                    value={description}
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

export default VariantCard;
