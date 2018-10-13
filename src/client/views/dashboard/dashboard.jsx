import React from 'react';
import styles from './dashboard.css';
import Card from '../../components/card/card';

export default (props) => (
  <div className={styles.dashboard}>
    <div className="container grid-xl">
      <div className="columns">
        <div className="column col-3">
          <Card>
            <h2>Ipa</h2>
            <h1>6 C</h1>
          </Card>
        </div>
        <div className="column col-3">
          <Card>
            <h2>Pilsener</h2>
            <h1>4.5 C</h1>
          </Card>
        </div>
      </div>
    </div>
  </div>
);
