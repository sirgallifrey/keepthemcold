import React from 'react';
import styles from './styles.css';
import Card from '../../components/card/card';
import api from '../../api';
import ContainerEdit from '../container-edit/container-edit';

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
      temperatureSet,
      sensorTemperature,
    } = this.state.sensor;
    const hasSensorData = sensorTemperature ? true : false;
    const fixedSensorTemperature = hasSensorData ? sensorTemperature.toFixed(1) : 0;
    const temperatureSetString = temperatureSet ? `${temperatureSet.toFixed(1)} C` : '?';
    const outOfRange = hasSensorData && (fixedSensorTemperature < minTemperature || fixedSensorTemperature > maxTemperature);
    const alert = outOfRange || !hasSensorData;
    let className = styles.card;
    if (alert) {
      className += ' alert';
    }
    return (
      <div>
        {
          this.state.editing &&
          <ContainerEdit onClose={this.handleCloseEdit} container={this.props.container}/>
        }
        <Card className={className} onClick={() => this.setState({ editing: true })}>
          <div className={styles.cardBody}>
            <div>
              <span className={styles.label}>
                {id} - {label}
              </span>
            </div>
            <div>
              <span className={styles.setTo}>
                Set to: {temperatureSetString}
              </span>
            </div>
            {
              hasSensorData &&
              <div>
                <span className={styles.sensorTemperature}>
                  {fixedSensorTemperature}
                </span>
                <span className={styles.celcius}>C</span>
              </div>
            }
            {
              !hasSensorData &&
              <div>
                <span className={styles.sensorTemperature}>?</span>
              </div>
            }
          </div>
          <div className={styles.drawer}>
            <div><span>Min: {minTemperature}C</span></div>
            <div><span>Max: {maxTemperature}C</span></div>
          </div>
        </Card>
      </div>
    );
  }
}
