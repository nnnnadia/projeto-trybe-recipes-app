import React from 'react';
import { PropTypes } from 'prop-types';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroupPadded } from '../../styles/StyledComponents';

function SavedRecipesFilters({ filter, setFilter }) {
  return (
    <ToggleButtonGroupPadded
      color="primary"
      size="small"
      value={ filter }
      exclusive
      onChange={ ({ target }) => setFilter(target.value) }
    >
      <ToggleButton
        value="all"
        checked={ filter === 'all' }
        data-testid="filter-by-all-btn"
      >
        All
      </ToggleButton>
      <ToggleButton
        value="food"
        checked={ filter === 'food' }
        data-testid="filter-by-food-btn"
      >
        Food
      </ToggleButton>
      <ToggleButton
        value="drink"
        checked={ filter === 'drink' }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </ToggleButton>
    </ToggleButtonGroupPadded>
  );
}

SavedRecipesFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default SavedRecipesFilters;
