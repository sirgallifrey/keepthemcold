import React from 'react';
import styles from './card.css';

export default (props) => {
  const { className, children, ...otherProps } = props;
  const classNameOrEmpty = className || '';
  return (
    <div className={`${styles.card} ${classNameOrEmpty}`} {...otherProps}>
      {children}
    </div>
  );
};
