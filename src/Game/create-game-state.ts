import { CellState, GameState } from './types';

export const createGameState = (
  height: number,
  width: number,
  mapFn: (v: unknown, k: number) => CellState = () => 0
): GameState => {
  return Array.from({ length: height }, () => Array.from({ length: width }, mapFn));
};
