import React from 'react';
import { Input, Button, Select } from 'antd';
import { Box } from 'rebass';
import { FunctionComponent } from 'react';
import RightAlignBox from '../components/RightAlignBox';
import { QuestionKind } from '../__generated__/graphql-global-types';
const VariantCard: FunctionComponent<{
    name?: string;
    setName?: (name: string) => void;
    kind?: QuestionKind;
    setKind?: (kind: QuestionKind) => void;
    onDelete?: () => void;
    newCard?: boolean;
}> = ({ name, setName, kind, setKind, onDelete, newCard = false }) => (
    <Box width={1}>
        {onDelete && (
            <RightAlignBox mt={-3}>
                <Button shape="circle" icon="delete" onClick={onDelete} />
            </RightAlignBox>
        )}
        <Box mt={1}>
            <Input
                size="large"
                placeholder={newCard ? 'New Question' : 'Question'}
                value={name}
                onChange={event => setName && setName(event.target.value)}
            />
        </Box>
        {!newCard && (
            <Box mt={2}>
                <Select style={{ width: 120 }} onChange={setKind} value={kind}>
                    <Select.Option value={QuestionKind.RATING}>Rating</Select.Option>
                    <Select.Option value={QuestionKind.YES_NO}>Yes/No</Select.Option>
                </Select>
            </Box>
        )}
    </Box>
);
export default VariantCard;
