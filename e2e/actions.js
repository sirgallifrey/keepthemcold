export async function setSensorState(id, state) {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(state);
  return fetch(`/containers/${id}/sensors`,
    {
      method: 'POST',
      headers,
      body,
    }
  );
}

export async function setContainerState(id, state) {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(state);
  return fetch(`/containers/${id}`,
    {
      method: 'PUT',
      headers,
      body,
    }
  );
}
