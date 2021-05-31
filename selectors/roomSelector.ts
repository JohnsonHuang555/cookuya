import { StoreState } from 'reducers/rootReducer';

export const roomsSelector = (store: StoreState) => store.room.rooms;
export const createdRoomIdSelector = (store: StoreState) =>
  store.room.createdRoomId;
export const playersSelector = (store: StoreState) => store.room.players;
export const roomInfoSelector = (store: StoreState) => store.room.roomInfo;

export const playerIdSelector = (store: StoreState) => store.room.yourPlayerId;
export const gameStatusSelector = (store: StoreState) => store.room.gameStatus;
