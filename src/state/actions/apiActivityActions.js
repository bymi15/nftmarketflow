export function getActivitiesAction(dispatch, data) {
  dispatch({
    payload: data,
    type: 'API_GET_ACTIVITIES',
  });
}

export function insertActivityAction(dispatch, data) {
  dispatch({
    payload: data,
    type: 'API_INSERT_ACTIVITY',
  });
}
