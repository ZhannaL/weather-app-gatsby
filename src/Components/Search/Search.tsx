import React, { createRef } from 'react';
import {
  InputAdornment,
  Button,
  IconButton,
  FilledInput,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { updateLocation, getCityEngName } from 'src/Reducers/actions';
import { connect } from 'react-redux';
import { State } from 'src/Reducers/reducers';
import style from './search.module.css';
import { Wrapper } from '../Wrapper';

type Props = Readonly<{
  updateCurrentLocation: typeof updateLocation;
  updateCityEngName: typeof getCityEngName;
  lang: string;
  isWrong: boolean;
}>;

type CompState = {
  currentSearch: string;
};

class Search extends React.PureComponent<Props, CompState> {
  private myRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentSearch: '',
    };
    this.myRef = createRef();
  }

  render(): JSX.Element {
    const { currentSearch } = this.state;
    const {
      updateCurrentLocation,
      updateCityEngName,
      lang,
      isWrong,
    } = this.props;
    return (
      <Wrapper className={style.search}>
        <FormControl fullWidth variant="filled">
          <InputLabel>
            {isWrong ? 'Incorrect search' : 'Search city'}
          </InputLabel>
          <FilledInput
            inputRef={this.myRef}
            onChange={(event) =>
              this.setState({ currentSearch: event.target.value })
            }
            error={isWrong}
            value={currentSearch}
            endAdornment={
              <>
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      this.setState({ currentSearch: '' });
                      this.myRef.current?.focus();
                    }}
                    edge="end"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      updateCurrentLocation(lang);
                      updateCityEngName();
                    }}
                    edge="end"
                  >
                    <MyLocationIcon />
                  </IconButton>
                </InputAdornment>
              </>
            }
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          onClick={() => {
            updateCurrentLocation(lang, currentSearch);
            updateCityEngName(currentSearch);
          }}
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
  isWrong: state.wrongSearch,
  lang: state.lang,
});

const mapDispatchToProps = {
  updateCurrentLocation: updateLocation,
  updateCityEngName: getCityEngName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
