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
  Theme,
} from '@material-ui/core';
import type { State } from 'src/Reducers/reducers';
import {
  changelang,
  changeTempType,
  updateLocation,
} from 'src/Reducers/actions';
import { connect } from 'react-redux';
import style from './controls.module.css';
import { Wrapper } from '../Wrapper';

const useStyles = (theme: Theme) =>
  createStyles({
    select: {
      padding: '6px',
      color: theme.palette.primary.main,
    },

    selectRoot: {
      borderBottom: '1px solid',
      borderColor: theme.palette.primary.main,
    },

    selectIcon: {
      color: theme.palette.primary.main,
    },

    radio: {
      color: theme.palette.primary.dark,
    },
  });

type Props = Readonly<{
  classes: {
    select: string;
    radio: string;
    selectRoot: string;
    selectIcon: string;
  };
  changelanguage: typeof changelang;
  changeTemperature: typeof changeTempType;
  updateCurrentLocation: typeof updateLocation;
  lang: string;
  tempType: string;
  city: string;
}>;

class Controls extends React.PureComponent<Props> {
  render(): JSX.Element {
    const {
      classes,
      changelanguage,
      changeTemperature,
      updateCurrentLocation,
      lang,
      tempType,
      city,
    } = this.props;

    // console.log(this.props);

    return (
      <Wrapper className={style.controls}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={style.btnBackground}
        >
          <AutorenewIcon />
        </Button>

        <FormControl variant="filled" className={style.selectControl}>
          <Select
            labelId="Language"
            value={lang}
            classes={{
              root: classes.selectRoot,
              filled: classes.select,
              icon: classes.selectIcon,
            }}
            onChange={(event) => {
              changelanguage(String(event.target.value));
              updateCurrentLocation(String(event.target.value), city);
            }}
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
          value={tempType}
          onChange={(event) => changeTemperature(String(event.target.value))}
        >
          <FormControlLabel
            value="celsius"
            control={
              <Radio
                color="primary"
                classes={{
                  root: classes.radio,
                }}
              />
            }
            label={<div>°C</div>}
            labelPlacement="end"
          />
          <FormControlLabel
            value="fahrenheit"
            control={
              <Radio
                color="primary"
                classes={{
                  root: classes.radio,
                }}
              />
            }
            label={<div>°F</div>}
            labelPlacement="end"
          />
        </RadioGroup>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: State) => ({
  lang: state.lang,
  tempType: state.tempType,
  city: state.city,
});

const mapDispatchToProps = {
  changelanguage: changelang,
  changeTemperature: changeTempType,
  updateCurrentLocation: updateLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Controls));
