import React from 'react';
import { useTranslation } from '../../../hooks/use-translation';
import { flat } from '../../../../utils';
import allowOverride from '../../../hoc/allow-override';
const List = props => {
  const {
    property,
    record
  } = props;
  const values = flat.get(record.params, property.path) || [];
  const {
    translateProperty
  } = useTranslation();
  return /*#__PURE__*/React.createElement("span", null, `${translateProperty('length')}: ${values.length}`);
};
export default allowOverride(List, 'DefaultArrayListProperty');