import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import QuestionCard from './QuestionCard';
import CategoryBar from '../components/CategoryBar';
import { QuestionCard as IQuestionCard } from './__generated__/QuestionCard';
import { QuestionKind } from '../__generated__/graphql-global-types';

interface Props {
    questions: IQuestionCard[];
    modifyQuestions: IQuestionCard[];
    setModifyQuestions: (question: IQuestionCard[]) => void;
    editableMode: boolean;
}

const QuestionsList: FunctionComponent<Props> = props => {
    const onDeleteQuestionClick = (question: IQuestionCard) => {
        const newQuestions = props.modifyQuestions.filter(question_ => question_.id !== question.id);
        props.setModifyQuestions(newQuestions);
    };

    const onQuestionUpdate = (id: string, change: Partial<IQuestionCard>) => {
        const index = props.modifyQuestions.findIndex(value => value.id == id);
        if (index === undefined) return; //Should throw error
        props.setModifyQuestions([
            ...props.modifyQuestions.slice(0, index),
            { ...props.modifyQuestions[index], ...change },
            ...props.modifyQuestions.slice(index + 1),
        ]);
    };

    const onAddQuestionClick = () => {
        const newQuestion: IQuestionCard = {
            id: props.modifyQuestions.length.toString(),
            name: '',
            description: '',
            kind: QuestionKind.YES_NO,
            __typename: 'QuestionType',
        };
        props.setModifyQuestions([...props.modifyQuestions, newQuestion]);
    };

    return (
        <>
            <CategoryBar title="questions" addButtonHook={props.editableMode ? onAddQuestionClick : undefined} />
            <Flex flexWrap="wrap" mx={-2}>
                {(props.editableMode ? props.modifyQuestions : props.questions).map((question: IQuestionCard) => (
                    <QuestionCard
                        {...question}
                        editableMode={props.editableMode}
                        onDelete={() => onDeleteQuestionClick(question)}
                        onUpdate={onQuestionUpdate}
                    />
                ))}
            </Flex>
        </>
    );
};

export default QuestionsList;
