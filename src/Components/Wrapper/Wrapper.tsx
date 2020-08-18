import React, { ReactNode } from 'react';
import style from './wrapper.module.css';

type Props = {
  children: ReactNode;
};

export default class Wrapper extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { children } = this.props;
    return <div className={style.wrapper}>{children}</div>;
  }
}
