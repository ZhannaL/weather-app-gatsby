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
import { connect, ConnectedProps } from 'react-redux';
import { State } from 'src/Reducers/rootReducer';
import style from './controls.module.css';
import { Wrapper } from '../Wrapper';
import { updateLocation } from '../Location/LocationActions';
import {
  changelang,
  changeTempType,
  loadingBackground,
  updateURLBackground,
} from './ControlsActions';

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

const mapStateToProps = (state: State) => ({
  lang: state.controls.lang,
  tempType: state.controls.tempType,
  city: state.location.city,
  isLoading: state.controls.loadingBackround,
});

const mapDispatchToProps = {
  changelanguage: changelang,
  changeTemperature: changeTempType,
  updateCurrentLocation: updateLocation,
  loading: loadingBackground,
  updateURL: updateURLBackground,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = Readonly<{
  classes: {
    select: string;
    radio: string;
    selectIcon: string;
  };
}> &
  PropsFromRedux;

type Language = 'ru' | 'en' | 'pl';

const isLanguage = (value: unknown): value is Language => {
  if (value === 'ru' || value === 'en' || value === 'pl') return true;
  return false;
};

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
              if (isLanguage(event.target.value)) {
                changelanguage(event.target.value);
                updateCurrentLocation(event.target.value, city);
              }
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

export default connector(withStyles(useStyles)(Controls));
