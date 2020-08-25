import React from 'react';
import { Typography } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { getLocal } from 'src/Translations/helpers';
import { State } from 'src/Reducers/rootReducer';
import style from './time.module.css';
import { Wrapper } from '../Wrapper';

const mapStateToProps = (state: State) => ({
  lang: state.controls.lang,
  timeZone: state.location.timeZone,
});

const connector = connect(mapStateToProps, null);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

type CompState = {
  currentTime: Date;
};

class Time extends React.PureComponent<Props, CompState> {
  interval: NodeJS.Timer | null;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    };
    this.interval = null;
  }

  componentDidMount(): void {
    this.interval = setInterval(
      () => this.setState({ currentTime: new Date() }),
      1000
    );
  }

  componentWillUnmount(): void {
    if (this.interval) clearInterval(this.interval);
  }

  render(): JSX.Element {
    const { lang, timeZone } = this.props;
    const { currentTime } = this.state;
    const local = getLocal(lang);

    const dayWeek = currentTime.toLocaleString(local, {
      weekday: 'short',
      ...(timeZone ? { timeZone } : null),
    });
    const stringTimeDay = currentTime
      .toLocaleString(local, {
        // @ts-ignore
        dateStyle: 'medium',
        ...(timeZone ? { timeZone } : null),
      })
      .split(' ');
    const time = currentTime.toLocaleString(local, {
      // @ts-ignore
      timeStyle: 'short',
      ...(timeZone ? { timeZone } : null),
    });

    return (
      <Wrapper className={style.time}>
        <Typography color="inherit" variant="h4">
          {dayWeek} {stringTimeDay[0]} {stringTimeDay[1]} {time}
        </Typography>
      </Wrapper>
    );
  }
}

export default connector(Time);
