import { ArraySchema } from '@colyseus/schema';
import Room from 'models/Room';

export enum Cell {
  Empty,
  X,
  O,
}

export interface TicTacToe extends Room {
  board: ArraySchema<Cell>;
}
