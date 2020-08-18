import React from 'react';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {
  FormControl,
  Select,
  Button,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  withStyles,
  createStyles,
} from '@material-ui/core';
import style from './controls.module.css';

const useStyles = () =>
  createStyles({
    select: {
      padding: '5px 6px',
    },
  });

type Props = Readonly<{
  classes: {
    select: string;
  };
}>;

class Controls extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={style.controls}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={style.btnBackground}
        >
          <AutorenewIcon />
        </Button>

        <FormControl variant="outlined" className={style.selectControl}>
          <Select
            labelId="Language"
            value="pl"
            classes={{
              outlined: classes.select,
            }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
            <MenuItem value="pl">PL</MenuItem>
          </Select>
        </FormControl>

        <RadioGroup row aria-label="temp" name="temp" defaultValue="celsius">
          <FormControlLabel
            value="celsius"
            control={<Radio color="primary" />}
            label={<div>°C</div>}
            labelPlacement="end"
          />
          <FormControlLabel
            value="fahrenheit"
            control={<Radio color="primary" />}
            label={<div>°F</div>}
            labelPlacement="end"
          />
        </RadioGroup>
      </div>
    );
  }
}

export default withStyles(useStyles)(Controls);
