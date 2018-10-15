import got from 'got';

export async function setSensorState(id, state) {
  return got.post(`http://localhost:9090/containers/${id}/sensors`, {
    body: state,
    json: true
  });
}

export async function setAllSensorStateToWithinRange() {
  return Promise.all([
    setSensorState(1, {
      sensorTemperature: 4,
    }),
    setSensorState(2, {
      sensorTemperature: 5,
    }),
    setSensorState(3, {
      sensorTemperature: 4,
    }),
    setSensorState(4, {
      sensorTemperature: 6,
    }),
    setSensorState(5, {
      sensorTemperature: 3,
    }),
    setSensorState(6, {
      sensorTemperature: 4,
    })
  ]);
}

export async function setAllContainersToDefault() {
  return Promise.all([
    setContainerState(1, {
      id: 1,
      label: 'Pilsener',
      minTemperature: 4,
      maxTemperature: 6,
    }),
    setContainerState(2, {
      id: 2,
      label: 'IPA',
      minTemperature: 5,
      maxTemperature: 6,
    }),
    setContainerState(3, {
      id: 3,
      label: 'Lager',
      minTemperature: 4,
      maxTemperature: 7,
    }),
    setContainerState(4, {
      id: 4,
      label: 'Stout',
      minTemperature: 6,
      maxTemperature: 8,
    }),
    setContainerState(5, {
      id: 5,
      label: 'Wheat beer',
      minTemperature: 3,
      maxTemperature: 5,
    }),
    setContainerState(6, {
      id: 6,
      label: 'Pale Ale',
      minTemperature: 4,
      maxTemperature: 6,
    })
  ]);
}

export async function setContainerState(id, state) {
  return got.put(`http://localhost:8080/containers/${id}`, {
    body: state,
    json: true
  });
}
