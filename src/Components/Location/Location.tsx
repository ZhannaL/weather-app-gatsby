import React from 'react';
import { Typography } from '@material-ui/core';

import { State } from 'src/Reducers/reducers';
import { updateLocation, getCityEngName } from 'src/Reducers/actions';
import { connect } from 'react-redux';
import style from './location.module.css';
import { Wrapper } from '../Wrapper';

type Props = Readonly<{
  updateCurrentLocation: typeof updateLocation;
  updateCityEngName: typeof getCityEngName;
  country: string;
  city: string;
  state: string;
  lang: string;
}>;

class Location extends React.PureComponent<Props> {
  componentDidMount() {
    const { updateCurrentLocation, updateCityEngName, lang } = this.props;
    updateCurrentLocation(lang);
    updateCityEngName();
  }

  render(): JSX.Element {
    const { country, city, state } = this.props;

    return (
      <Wrapper className={style.location}>
        <Typography color="inherit" variant="h4">
          <p>
            {city} {city ? ',' : ''} {country}
          </p>
          <p>{state}</p>
        </Typography>
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
  updateCityEngName: getCityEngName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
