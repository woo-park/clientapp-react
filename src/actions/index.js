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
  return { type: 'POST_WAVEDATA_STARTED', payload: {} }
}

function postWaveDataFailed(err) {
  return { type: 'POST_WAVEDATA_FAILED', payload: err }
}




function fetchPostsDataStarted() {
  return { type: 'FETCH_POSTSDATA_STARTED', payload: {} }
}

function fetchPostsDataFailed() {
  return { type: 'FETCH_POSTSDATA_FAILED', payload: {} }
}

export function fetchPostsData() {
  return (dispatch, getState) => {
    dispatch(fetchPostsDataStarted())

    return api
      .fetchPostsData()
      .then(resp => {
        dispatch(receivePosts(resp))
      })
      .catch(err => {
        dispatch(fetchPostsDataFailed())
      })
  }
}


function receivePosts(entities) {
  return {
    type: 'RECEIVE_POSTS',
    payload: {
        posts: entities
    }
  }
}


function receiveThreads(entities) {
  return {
    type: 'RECEIVE_THREADS',
    payload: {
        threads: entities
    }
  }
}

export function fetchThreadsData() {
  return (dispatch, getState) => {
    // dispatch(fetchCommentsDataStarted())
    return api
      .fetchThreadsData()
      .then(resp => {
        dispatch(receiveThreads(resp))
      })
      .catch(err => {
        dispatch(fetchCommentsDataFailed()) //change this to fetchthreadsdatafailed later
      })
  }
}


export function fetchCommentsData() {
  return (dispatch, getState) => {
    dispatch(fetchCommentsDataStarted())

    return api
      .fetchCommentsData()
      .then(resp => {
        dispatch(receiveComments(resp))
      })
      .catch(err => {
        dispatch(fetchCommentsDataFailed())
      })
  }
}


function fetchCommentsDataStarted() {
  return { type: 'FETCH_COMMENTSDATA_STARTED', payload: {} }
}

function fetchCommentsDataFailed() {
  return { type: 'FETCH_COMMENTSDATA_FAILED', payload: {} }
}

function receiveComments(entities) {
  return {
    type: 'RECEIVE_COMMENTS',
    payload: {
        comments: entities
    }
  }
}

export function userLoggedIn(userName, userID) {
  return {
    type: 'RECEIVE_USERNAME',
    payload: {
        userName: userName,
        userID: userID
    }
  }
}
