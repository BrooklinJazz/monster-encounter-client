/* global fetch */
import {BASE_URL} from './config';

function getJwt () {
  return `JWT ${localStorage.getItem('jwt')}`;
}
// HTTP REQUESTS

export const Combat = {
  create (params) {
    // params should be an object
    return fetch(
      `${BASE_URL}/api/v1/users/${params.user_id}/combats`,
      {
        method: 'POST',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
    // NOTE commented this out because it prevented other .then statements
    // from running in SaveFight.js
    // .then(res => res.json())
  }
}
