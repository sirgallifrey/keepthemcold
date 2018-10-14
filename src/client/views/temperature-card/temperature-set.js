import React from 'react';
import styles from './temperature-card.css';

export default ({ fixedTemperatureSet }) => (
  <span className={styles.setTo}>
    {
      fixedTemperatureSet &&
      <span>Set to: {fixedTemperatureSet} °C</span>
    }
    {
      !fixedTemperatureSet &&
      <span>Set to: ?</span>
    }
  </span>
);
