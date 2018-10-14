import React from 'react';
import styles from './container-edit.css';
import Card from '../../components/card/card';

export default class ContainerEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containers: []
    };

    this.formValues = Object.assign({}, props.container);

    this.handleClickOnCard = this.handleClickOnCard.bind(this);
    this.handleClickOnBackdrop = this.handleClickOnBackdrop.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOnCard(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleClickOnBackdrop() {
    this.props.onClose();
  }

  handleValueChange(event) {
    this.formValues[event.target.name] = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.formValues);
    fetch(`/containers/${this.props.container.id}`,
      {
        method: 'PUT',
        headers,
        body,
      }
    ).then((response) => {
      if (response.ok) {
        this.props.onClose();
      } else {
        return response.json();
      }
    }).then((error) => {
      if (error) {
        this.setState({ error });
      }
    });
  }

  render() {
    return (
      <div className={styles.backdrop} onClick={this.handleClickOnBackdrop}>
        <div className="container grid-sm">
          <div className="columns">
            <div className="column col-10 col-mr-auto col-ml-auto">
              <Card onClick={this.handleClickOnCard}>
                {
                  this.state.error &&
                  <div className={styles.error}>{this.state.error.message}</div>
                }
                <form className={styles.form}>
                  <div>
                    <label className={styles.label}>Label</label>
                    <input className={styles.input}
                      type="text"
                      defaultValue={this.props.container.label}
                      name="label"
                      onChange={this.handleValueChange}
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Min Temperature</label>
                    <input className={styles.input}
                      type="number"
                      defaultValue={this.props.container.minTemperature}
                      name="minTemperature"
                      onChange={this.handleValueChange}
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Max Temperature</label>
                    <input className={styles.input}
                      type="number"
                      defaultValue={this.props.container.maxTemperature}
                      name="maxTemperature"
                      onChange={this.handleValueChange}
                    />
                  </div>
                  <button type="submit"
                    className={`ktc_button ${styles.button}`}
                    onClick={this.handleSubmit}>
                    Save
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
