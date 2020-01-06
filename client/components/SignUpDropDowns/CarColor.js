import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  FormControl, Select, Input, MenuItem
} from '@material-ui/core';

const carColors = require('../../data/carColors.json')

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    margin: '10px 0px 0px 10px',
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
}));

const ITEM_HEIGHT = 42;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CarColor({ carColor, handleChange }) {
  const classes = useStyles();
  const options = carColors.map((color, idx) => <MenuItem key={`make${idx}`} value={color.label}>{color.label}</MenuItem>);

  return (
    <div>
      <InputLabel className={classes.inputLabel} shrink htmlFor="car-color-label-placeholder">
        Color
      </InputLabel>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          className={classes.select}
          value={carColor}
          input={<Input />}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {options}
        </Select>
      </FormControl>
    </div>
  );
}
