import React, { memo, useMemo } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Icon, cssClass } from '@adminjs/design-system';
const SortLink = props => {
  const {
    sortBy,
    property,
    direction
  } = props;
  const location = useLocation();
  const isActive = useMemo(() => sortBy === property.propertyPath, [sortBy, property]);
  const query = new URLSearchParams(location.search);
  const oppositeDirection = isActive && direction === 'asc' ? 'desc' : 'asc';
  const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`;
  query.set('direction', oppositeDirection);
  query.set('sortBy', property.propertyPath);
  return /*#__PURE__*/React.createElement(NavLink, {
    to: {
      search: query.toString()
    },
    className: cssClass('SortLink')
  }, property.label, isActive ? /*#__PURE__*/React.createElement(Icon, {
    icon: sortedByIcon,
    color: "primary100",
    ml: "default"
  }) : '');
};
const checkSortProps = (prevProps, nextProps) => prevProps.direction === nextProps.direction && prevProps.property.propertyPath === nextProps.property.propertyPath && prevProps.sortBy === nextProps.sortBy;
export default /*#__PURE__*/memo(SortLink, checkSortProps);