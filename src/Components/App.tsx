import React from 'react';
import { connect } from 'react-redux';
import { State } from 'src/Reducers/reducers';
import image from 'src/styles/images/land.jpg';
import style from './app.module.css';
import { Controls } from './Controls';
import { Search } from './Search';
import { Location } from './Location';
import { Time } from './Time';
import { MapBlock } from './Map';
import { WeatherMain } from './WeatherMain';
import { WeatherForecast } from './WeatherForecast';

type Props = Readonly<{
  url: string;
}>;

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

const mapStateToProps = (state: State) => ({
  url: state.url,
});

export default connect(mapStateToProps, null)(App);
