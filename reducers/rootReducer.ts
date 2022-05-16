import appReducer, { State as AppState } from 'reducers/appReducer';
import roomReducer, { State as RoomState } from 'reducers/roomReducer';
import serverReducer, { State as ServerState } from 'reducers/serverReducer';
import mathFormulaReducer, {
  State as MathFormulaCardState,
} from 'reducers/game_settings/mathFormulaReducer';
import { combineReducers } from 'redux';

export type StoreState = {
  app: AppState;
  room: RoomState;
  server: ServerState;
  // games settings
  mathFormula: MathFormulaCardState;
};

export default combineReducers({
  app: appReducer,
  room: roomReducer,
  server: serverReducer,
  mathFormula: mathFormulaReducer,
});
