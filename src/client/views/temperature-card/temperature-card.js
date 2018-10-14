import React from 'react';
import styles from './temperature-card.css';
import Card from '../../components/card/card';
import api from '../../api';
import ContainerEdit from '../container-edit/container-edit';
import interpretSensorData from './interpret-sensor-data';
import TemperatureSet from './temperature-set';
import SensorTemperature from './sensor-temperature';

export default class TemperatureCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensor: {},
      editing: false
    };

    this.handleSensorUpdate = this.handleSensorUpdate.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
  }

  componentDidMount() {
    api.subscribe(`/containers/${this.props.container.id}/sensors`, this.handleSensorUpdate);
  }

  componentWillUnmount() {
    api.unsubscribe(`/containers/${this.props.container.id}/sensors`, this.handleSensorUpdate);
  }

  handleSensorUpdate(sensor) {
    this.setState({ sensor });
  }

  handleCloseEdit() {
    this.setState({ editing: false });
  }

  render() {
    const {
      id,
      label,
      minTemperature,
      maxTemperature,
    } = this.props.container;

    const {
      shouldAlert,
      fixedSensorTemperature,
      fixedTemperatureSet,
    } = interpretSensorData(this.props.container, this.state.sensor);

    let className = styles.card;
    if (shouldAlert) {
      className += ' alert';
    }
    return (
      <div>
        {
          this.state.editing &&
          <ContainerEdit onClose={this.handleCloseEdit} container={this.props.container} />
        }
        <Card className={className} onClick={() => this.setState({ editing: true })}>
          <div className={styles.cardBody}>
            <div>
              <span className={styles.label}>
                {id} - {label}
              </span>
            </div>
            <div>
              <TemperatureSet fixedTemperatureSet={fixedTemperatureSet} />
            </div>
            <SensorTemperature fixedSensorTemperature={fixedSensorTemperature} />
          </div>
          <div className={styles.drawer}>
            <div><span>Min: {minTemperature} °C</span></div>
            <div><span>Max: {maxTemperature} °C</span></div>
          </div>
        </Card>
      </div>
    );
  }
}
