import * as api from '../api';

function receiveEntities(entities) {
  return {
    type: 'RECEIVE_ENTITIES',
    payload: {
        waveData: entities
    }
  }
}

export function fetchWaveData() {
  return (dispatch, getState) => {
    dispatch(fetchWaveDataStarted());

    return api
      .fetchWaveData()
      .then(resp => {
        console.log(resp,'resp');
        dispatch(receiveEntities(resp))
      })
      .catch(err => {
        fetchWaveDataFailed(err);
      })
  }
}



function fetchWaveDataStarted() {
  return { type: 'FETCH_WAVEDATA_STARTED', payload: {} };
}

function fetchWaveDataFailed(err) {
  return { type: 'FETCH_WAVEDATA_FAILED', payload: err };
}


export function postWaveData(stationCode) {
  return (dispatch, getState) => {
    dispatch(postWaveDataStarted())

    return api
      .postWaveData(stationCode)
      .then(resp => {
        dispatch(receiveEntities(resp))
      })
      .catch(err => {
        postWaveDataFailed(err);
      })
  }
}


function postWaveDataStarted() {
  return { type: 'POST_WAVEDATA_STARTED', payload: {} };
}

function postWaveDataFailed(err) {
  return { type: 'POST_WAVEDATA_FAILED', payload: err };
}
