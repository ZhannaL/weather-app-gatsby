import React, { ReactNode } from 'react';
import classnames from 'classnames';
import * as style from './wrapper.module.css';

type Props = {
  children: ReactNode;
  className?: string;
};

export default class Wrapper extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { children, className } = this.props;
    return (
      <div className={classnames(className, style.wrapper)}>{children}</div>
    );
  }
}
