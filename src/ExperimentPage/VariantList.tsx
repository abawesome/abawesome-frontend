import React, { FunctionComponent, useState } from 'react';
import gql from 'graphql-tag';
import { Flex, Text } from 'rebass';
import ExpandableList from '../components/ExpandableList';
import VariantCard, { VARIANT_CARD_FRAGMENT } from './VariantCard';
import CategoryBar from '../components/CategoryBar';
import { VariantCard as IVariantCard } from './__generated__/VariantCard';
import PageContentWrapper from '../components/PageContentWrapper';
import { useMutation } from '@apollo/react-hooks';

interface Props {
    variants: IVariantCard[];
    modifyVariants: IVariantCard[];
    setModifyVariants: (variant: IVariantCard[]) => void;
    editableMode: boolean;
}

const VariantsList: FunctionComponent<Props> = props => {
    const onDeleteVariantClick = (variant: IVariantCard) => {
        const newVariants = props.modifyVariants.filter(variant_ => variant_.id !== variant.id);
        props.setModifyVariants(newVariants);
    };

    const onVariantUpdate = (id: string, change: Partial<IVariantCard>) => {
        const index = props.modifyVariants.findIndex(value => value.id == id);
        if (index === undefined) return; //Should throw error
        props.setModifyVariants([
            ...props.modifyVariants.slice(0, index),
            { ...props.modifyVariants[index], ...change },
            ...props.modifyVariants.slice(index + 1),
        ]);
    };

    const onAddVariantClick = () => {
        const newCard: IVariantCard = {
            id: props.modifyVariants.length.toString(),
            name: '',
            description: '',
            __typename: 'VariantType',
        };
        props.setModifyVariants([...props.modifyVariants, newCard]);
    };

    return (
        <>
            <CategoryBar title="variants" addButtonHook={props.editableMode ? onAddVariantClick : undefined} />
            <Flex flexWrap="wrap" mx={-2}>
                {(props.editableMode ? props.modifyVariants : props.variants).map((variant: IVariantCard) => (
                    <VariantCard
                        {...variant}
                        editableMode={props.editableMode}
                        onDelete={() => onDeleteVariantClick(variant)}
                        onUpdate={onVariantUpdate}
                    />
                ))}
            </Flex>
        </>
    );
};

export default VariantsList;
