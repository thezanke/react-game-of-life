export interface GameActions {
  togglePlaying(): void;
  toggleCell(x: number, y: number): void;
  nextGeneration(): void;
}

export enum CellState {
  DEAD,
  ALIVE
}

export type GameState = CellState[][];

export type UpdateFunc = (value: CellState) => CellState;

export type UpdateCellFunc = (
  board: GameState,
  x: number,
  y: number,
  value: CellState | UpdateFunc
) => GameState;
