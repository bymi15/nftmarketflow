import { insertActivityAction, getActivitiesAction } from 'state/actions/apiActivityActions';
import { callGet, callPost } from './request';

export const getActivities = async (dispatch) => {
  const { data, err } = await callGet('/activities');
  if (data && !err) {
    getActivitiesAction(dispatch, data);
  }
};

export const getActivitiesByUser = async (dispatch, userAddr) => {
  const { data, err } = await callGet(`/activities?userAddr=${userAddr}`);
  if (data && !err) {
    getActivitiesAction(dispatch, data);
  }
};

export const insertActivity = async (dispatch, activity) => {
  const { data, err } = await callPost('/activities', activity);
  if (data && !err) {
    insertActivityAction(dispatch, data);
  } else {
    throw err;
  }
};
