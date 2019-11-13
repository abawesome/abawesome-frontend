import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { VariantsList as IVariantsList } from './__generated__/VariantsList';
import { Text } from 'rebass';
import ExpandableList from '../components/ExpandableList';
import VariantCard, { VARIANT_CARD_FRAGMENT } from './VariantCard';

export const VARIANTS_LIST_FRAGMENT = gql`
    fragment VariantsList on ExperimentType {
        variants {
            ...VariantCard
        }
    }
    ${VARIANT_CARD_FRAGMENT}
`;

interface Props extends IVariantsList {
    loading: boolean;
    projectId: string;
}

//
// const VariantsList: FunctionComponent<Props> = ({ variants, projectId }) => {
//     return (
//         <ExpandableList
//             items={(variants || []).map(variant => ({
//                 item: (
//                     <VariantCard
//                         key={(variant && variant.id) || ''}
//                         {...(variant || { id: '', name: '', __typename: 'VariantType' })}
//                         name={projectId}
//                     />
//                 ),
//             }))}
//         />
//     );
// };
//
// export default VariantsList;
