import React from 'react';
import styles from './dashboard.css';
import api from '../../api';
import TemperatureCard from '../temperature-card/temperature-card';
import SimulateButton from '../simulate/simulate-button';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containers: []
    };

    this.handleContainersUpdate = this.handleContainersUpdate.bind(this);
  }

  componentDidMount() {
    api.subscribe('/containers', this.handleContainersUpdate);
  }

  componentWillUnmount() {
    api.unsubscribe('/containers', this.handleContainersUpdate);
  }

  handleContainersUpdate(containers) {
    this.setState({ containers });
  }

  render() {
    return (
      <div className={styles.dashboard}>
        <div className="container">
          <div className="columns">
            {
              this.state.containers.map((container) => (
                <div className="column col-xs-6 col-4" key={container.id}>
                  <TemperatureCard container={container}/>
                </div>
              ))
            }
          </div>
          <SimulateButton/>
        </div>
      </div>
    );
  }
}
