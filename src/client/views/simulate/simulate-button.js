import React from 'react';
import styles from './simulate-button.css';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export default class SimulateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simulating: false,
    };
    this.sensors = [
      {
        temperatureSet: 5,
        sensorTemperature: 5,
      },
      {
        temperatureSet: 5.5,
        sensorTemperature: 5.5,
      },
      {
        temperatureSet: 6,
        sensorTemperature: 6,
      },
      {
        temperatureSet: 7,
        sensorTemperature: 7,
      },
      {
        temperatureSet: 4,
        sensorTemperature: 4,
      },
      {
        temperatureSet: 5,
        sensorTemperature: 5,
      }
    ];

    this.handleClick = this.handleClick.bind(this);
    this.simulate = this.simulate.bind(this);
    this.nextSimulation = setTimeout(() => this.simulate(), 1000);
  }

  simulate() {
    if (!this.state.simulating) {
      return;
    }

    this.sensors.forEach((sensor, i) => {
      const fakeSensorFailure = Math.random() < 0.01;
      const fakeTemperatureSetFailure = Math.random() < 0.01;
      const payload = {};
      sensor.sensorTemperature += getRandomArbitrary(-0.2, 0.2);
      if (!fakeSensorFailure) {
        payload.sensorTemperature = sensor.sensorTemperature;
      }
      if (!fakeTemperatureSetFailure) {
        payload.temperatureSet = sensor.temperatureSet;
      }

      const headers = { 'Content-Type': 'application/json' };
      const body = JSON.stringify(payload);
      fetch(`/containers/${i + 1}/sensors`,
        {
          method: 'POST',
          headers,
          body,
        });
    });
    this.nextSimulation = setTimeout(this.simulate, 5000);
  }

  handleClick() {
    this.setState((state) => {
      return { simulating: !state.simulating };
    }, () => {
      if (!this.state.simulating) {
        clearTimeout(this.nextSimulation);
      } else {
        this.simulate();
      }
    });
  }

  render() {
    let className = `ktc_button ${styles.button}`;
    if (this.state.simulating) {
      className += ' active';
    }
    return (
      <button onClick={this.handleClick} className={className}>
        {!this.state.simulating && 'Simulate'}
        {this.state.simulating && 'Simulating...'}
      </button>
    );
  }
}
