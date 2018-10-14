import React from 'react';
import styles from './temperature-card.css';

export default ({ fixedSensorTemperature }) => {
  if (fixedSensorTemperature) {
    return (
      <div>
        <span className={styles.sensorTemperature}>
          {fixedSensorTemperature}
        </span>
        <span className={styles.celcius}> °C</span>
      </div>
    );
  }
  return (
    <div>
      <span className={styles.sensorTemperature}>?</span>
    </div>
  );
};
