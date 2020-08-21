import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { State } from 'src/Reducers/reducers';
import { getLocal } from 'src/Translations/helpers';
import style from './time.module.css';
import { Wrapper } from '../Wrapper';

type Props = Readonly<{
  lang: string;
  timeZone: string;
}>;

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
    // const timeZone = 'Europe/Warsaw';

    const { currentTime } = this.state;

    const local = getLocal(lang);

    const dayWeek = currentTime.toLocaleString(local, {
      weekday: 'short',
      ...(timeZone ? { timeZone } : null),
    });
    const stringTimeDay = currentTime
      .toLocaleString(local, {
        dateStyle: 'medium',
        ...(timeZone ? { timeZone } : null),
      })
      .split(' ');
    const time = currentTime.toLocaleString(local, {
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

const mapStateToProps = (state: State) => ({
  lang: state.lang,
  timeZone: state.timeZone,
});

export default connect(mapStateToProps, null)(Time);
