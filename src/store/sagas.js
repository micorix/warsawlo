import { takeLatest, call, put } from 'redux-saga/effects';
const apiURL = 'https://cdn.jsdelivr.net/gh/WarsawLO/data@92706ad/data/data.json'


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest('GET_DATA_REQUEST', workerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const res = yield call(fetch, apiURL)
    const data = yield res.json()
    console.log(data)

    // dispatch a success action to the store with the new dog
    yield put({ type: 'GET_DATA_SUCCESS', data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: 'GET_DATA_FAILURE', error });
  }
}
