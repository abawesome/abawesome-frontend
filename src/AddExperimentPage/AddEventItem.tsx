import React from 'react';
import Card from '../components/Card';
import { Input, Button } from 'antd';
import { Box, Text } from 'rebass';
import { FunctionComponent } from 'react';
import RightAlignBox from '../components/RightAlignBox';
const AddEventItem: FunctionComponent<{
    name?: string;
    setName?: (name: string) => void;
    description?: string;
    setDescription?: (description: string) => void;
    onDelete?: () => void;
    newCard?: boolean;
}> = ({ name, setName, description, setDescription, onDelete, newCard = false }) => (
    <Box width={1}>
        {onDelete && (
            <RightAlignBox mt={-3}>
                <Button shape="circle" icon="delete" onClick={onDelete} />
            </RightAlignBox>
        )}
        <Box mt={1}>
            <Input
                size="large"
                placeholder={newCard ? 'New Event Name' : 'Event Name'}
                value={name}
                onChange={event => setName && setName(event.target.value)}
            />
        </Box>
        {!newCard && (
            <Box mt={2}>
                <Input.TextArea
                    placeholder={'Event Description'}
                    value={description}
                    onChange={event => setDescription && setDescription(event.target.value)}
                />
            </Box>
        )}
    </Box>
);
export default AddEventItem;
