import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import image from 'src/styles/images/land.jpg';
import { State } from 'src/Reducers/rootReducer';
import style from './app.module.css';
import { Controls } from './Controls';
import { Search } from './Search';
import { Location } from './Location';
import { Time } from './Time';
import { MapBlock } from './Map';
import { WeatherMain } from './WeatherMain';
import { WeatherForecast } from './WeatherForecast';

const mapStateToProps = (state: State) => ({
  url: state.controls.url,
});

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class App extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { url } = this.props;
    return (
      <div
        style={{
          backgroundImage: `url(${url || image})`,
        }}
        className={style.appBackground}
      >
        <div className={style.appWrapper}>
          <Controls />
          <Search />
          <Location />
          <Time />
          <MapBlock />
          <WeatherMain />
          <WeatherForecast />
        </div>
      </div>
    );
  }
}

export default connector(App);
