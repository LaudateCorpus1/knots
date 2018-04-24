import {
  UPDATE_KNOTS,
  KNOT_RUNNING,
  KNOT_RUN_COMPLETE,
  KNOT_SAVED,
  SET_SYNC_MODE,
  DOCKER_INSTALL_ERROR
} from '../actions/knots';

export type knotsStateType = {
  +knots: Array<string>,
  +loading: boolean,
  +synced: boolean,
  +text: string,
  +syncLogs: string,
  +saved: boolean,
  +syncMode: string,
  +showAlert: boolean
};

export default function knots(
  state = {
    knots: [],
    loading: false,
    synced: false,
    syncLogs: '',
    saved: false,
    showAlert: false
  },
  action
) {
  switch (action.type) {
    case DOCKER_INSTALL_ERROR:
      return Object.assign({}, state, { showAlert: true, knots: action.knots });
    case UPDATE_KNOTS:
      return Object.assign({}, state, {
        knots: action.knots,
        showAlert: false
      });
    case KNOT_RUNNING:
      return Object.assign({}, state, {
        loading: true,
        synced: false,
        syncLogs: action.syncLogs
      });
    case KNOT_RUN_COMPLETE:
      return Object.assign({}, state, { loading: false, synced: true });
    case KNOT_SAVED:
      return Object.assign({}, state, { saved: true });
    case SET_SYNC_MODE:
      return Object.assign({}, state, {
        syncMode: action.syncMode,
        knot: action.knot
      });
    default:
      return state;
  }
}
