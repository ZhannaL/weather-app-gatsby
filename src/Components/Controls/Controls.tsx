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
import type { State } from 'src/Reducers/reducers';
import { changelang, changeTemp } from 'src/Reducers/actions';
import { connect } from 'react-redux';
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
  changelanguage: typeof changelang;
  changeTemperature: typeof changeTemp;
  lang: string;
  temp: string;
}>;

class Controls extends React.PureComponent<Props> {
  render(): JSX.Element {
    const {
      classes,
      changelanguage,
      changeTemperature,
      lang,
      temp,
    } = this.props;

    console.log(this.props);

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
            value={lang}
            classes={{
              outlined: classes.select,
            }}
            onChange={(event) => changelanguage(String(event.target.value))}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
            <MenuItem value="pl">PL</MenuItem>
          </Select>
        </FormControl>

        <RadioGroup
          row
          aria-label="temp"
          name="temp"
          value={temp}
          onChange={(event) => changeTemperature(String(event.target.value))}
        >
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

const mapStateToProps = (state: State) => ({
  lang: state.lang,
  temp: state.temp,
});

const mapDispatchToProps = {
  changelanguage: changelang,
  changeTemperature: changeTemp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Controls));
