import { Box, Button, Drawer, DrawerContent, DrawerFooter, H3, Icon } from '@adminjs/design-system';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import allowOverride from '../../hoc/allow-override';
import { useTranslation } from '../../hooks';
import { getResourceElementCss } from '../../utils';
import PropertyType from '../property-type';
const parseQuery = location => {
  const filter = {};
  const query = new URLSearchParams(location.search);
  for (const entry of query.entries()) {
    const [key, value] = entry;
    if (key.match('filters.')) {
      filter[key.replace('filters.', '')] = value;
    }
  }
  return filter;
};
const FilterDrawer = props => {
  const {
    resource,
    isVisible,
    toggleFilter
  } = props;
  const properties = resource.filterProperties;
  const location = useLocation();
  const [filter, setFilter] = useState(parseQuery(location));
  const params = useParams();
  const navigate = useNavigate();
  const {
    translateLabel,
    translateButton
  } = useTranslation();
  const initialLoad = useRef(true);
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
    } else {
      setFilter({});
    }
  }, [params.resourceId]);
  const handleSubmit = event => {
    event.preventDefault();
    const search = new URLSearchParams(window.location.search);
    Object.keys(filter).forEach(key => {
      if (filter[key] !== '') {
        search.set(`filters.${key}`, filter[key]);
      } else {
        search.delete(`filters.${key}`);
      }
    });
    toggleFilter();
    search.set('page', '1');
    navigate(`${location.pathname}?${search.toString()}`);
    return false;
  };
  const resetFilter = event => {
    event.preventDefault();
    const filteredSearch = new URLSearchParams();
    const search = new URLSearchParams(window.location.search);
    for (const key of search.keys()) {
      if (!key.match('filters.')) {
        filteredSearch.set(key, search.get(key));
      }
    }
    const query = filteredSearch.toString() === '' ? `?${filteredSearch.toString()}` : '';
    toggleFilter();
    navigate(location.pathname + query);
    setFilter({});
  };
  const handleChange = (propertyName, value) => {
    if (propertyName.params) {
      throw new Error('you can not pass RecordJSON to filters');
    }
    setFilter({
      ...filter,
      [propertyName]: value
    });
  };
  const contentTag = getResourceElementCss(params.resourceId, 'filter-drawer');
  const cssContent = getResourceElementCss(params.resourceId, 'filter-drawer-content');
  const cssFooter = getResourceElementCss(params.resourceId, 'filter-drawer-footer');
  const cssButtonApply = getResourceElementCss(params.resourceId, 'filter-drawer-button-apply');
  const cssButtonReset = getResourceElementCss(params.resourceId, 'filter-drawer-button-reset');
  return /*#__PURE__*/React.createElement(Drawer, {
    variant: "filter",
    isHidden: !isVisible,
    as: "form",
    onSubmit: handleSubmit,
    "data-css": contentTag
  }, /*#__PURE__*/React.createElement(DrawerContent, {
    "data-css": cssContent
  }, /*#__PURE__*/React.createElement(H3, null, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    size: "icon",
    rounded: true,
    mr: "lg",
    onClick: () => toggleFilter()
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: "ChevronRight",
    color: "white"
  })), translateLabel('filters', resource.id)), /*#__PURE__*/React.createElement(Box, {
    my: "x3"
  }, properties.map(property => /*#__PURE__*/React.createElement(PropertyType, {
    key: property.propertyPath,
    where: "filter",
    onChange: handleChange,
    property: property,
    filter: filter,
    resource: resource
  })))), /*#__PURE__*/React.createElement(DrawerFooter, {
    "data-css": cssFooter
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    "data-css": cssButtonApply
  }, translateButton('applyChanges', resource.id)), /*#__PURE__*/React.createElement(Button, {
    variant: "text",
    size: "lg",
    onClick: resetFilter,
    type: "button",
    color: "white",
    "data-css": cssButtonReset
  }, translateButton('resetFilter', resource.id))));
};
const OverridableFilterDrawer = allowOverride(FilterDrawer, 'FilterDrawer');
export { OverridableFilterDrawer as default, OverridableFilterDrawer as FilterDrawer };