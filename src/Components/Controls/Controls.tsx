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
  Tooltip,
} from '@material-ui/core';
import type { State } from 'src/Reducers/reducers';
import {
  changelang,
  changeTempType,
  updateLocation,
  loadingBackground,
  updateURLBackground,
} from 'src/Reducers/actions';
import { connect } from 'react-redux';
import style from './controls.module.css';
import { Wrapper } from '../Wrapper';

const useStyles = (theme: Theme) =>
  createStyles({
    select: {
      padding: '10px',
      width: '32px',
      color: theme.palette.primary.main,
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
    selectIcon: string;
  };
  changelanguage: typeof changelang;
  changeTemperature: typeof changeTempType;
  updateCurrentLocation: typeof updateLocation;
  loading: typeof loadingBackground;
  updateURL: typeof updateURLBackground;
  lang: string;
  tempType: string;
  city: string;
  isLoading: boolean;
}>;

class Controls extends React.PureComponent<Props> {
  componentDidMount() {
    const { updateURL, city } = this.props;
    updateURL(city);
  }

  render(): JSX.Element {
    const {
      classes,
      changelanguage,
      changeTemperature,
      updateCurrentLocation,
      lang,
      tempType,
      city,
      loading,
      isLoading,
      updateURL,
    } = this.props;

    return (
      <Wrapper className={style.controls}>
        <Tooltip title="change background image">
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={style.btnBackground}
            onClick={() => {
              loading();
              updateURL(city);
            }}
          >
            <AutorenewIcon className={isLoading ? style.iconLoading : ''} />
          </Button>
        </Tooltip>

        <FormControl variant="filled" className={style.selectControl}>
          <Select
            labelId="Language"
            value={lang}
            classes={{
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
  isLoading: state.loadingBackround,
});

const mapDispatchToProps = {
  changelanguage: changelang,
  changeTemperature: changeTempType,
  updateCurrentLocation: updateLocation,
  loading: loadingBackground,
  updateURL: updateURLBackground,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Controls));
