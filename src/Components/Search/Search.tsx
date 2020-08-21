import React from 'react';
import {
  InputAdornment,
  Button,
  IconButton,
  FilledInput,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { updateLocation } from 'src/Reducers/actions';
import { connect } from 'react-redux';
import { State } from 'src/Reducers/reducers';
import style from './search.module.css';
import { Wrapper } from '../Wrapper';

type Props = Readonly<{
  updateCurrentLocation: typeof updateLocation;
  country: string;
  city: string;
  state: string;
  lang: string;
}>;

type CompState = {
  currentSearch: string;
};

class Search extends React.PureComponent<Props, CompState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentSearch: '',
    };
  }

  render(): JSX.Element {
    const { currentSearch } = this.state;
    const { updateCurrentLocation, lang } = this.props;

    return (
      <Wrapper className={style.search}>
        <FormControl fullWidth variant="filled">
          <InputLabel>Search city</InputLabel>
          <FilledInput
            onChange={(event) =>
              this.setState({ currentSearch: event.target.value })
            }
            value={currentSearch}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => updateCurrentLocation(lang)}
                  edge="end"
                >
                  <MyLocationIcon />
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          onClick={() => updateCurrentLocation(lang, currentSearch)}
          variant="contained"
          size="small"
          color="primary"
          className={style.btnSearch}
        >
          Search
        </Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: State) => ({
  country: state.country,
  city: state.city,
  state: state.state,
  lang: state.lang,
});

const mapDispatchToProps = {
  updateCurrentLocation: updateLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
