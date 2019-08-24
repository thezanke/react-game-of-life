import { GameState, CellState, UpdateFunc } from './types';

export type UpdateCellFunc = (board: GameState, x: number, y: number, value: CellState | UpdateFunc) => GameState;

export class GameEngine {
  constructor(private width: number, private height: number) {}

  createState(height: number, width: number, mapFn: (v: unknown, k: number) => CellState = () => 0): GameState {
    return Array.from({ length: height }, () => Array.from({ length: width }, mapFn));
  }

  mapState(state: GameState, mapFn: (cell: CellState, x: number, y: number) => CellState = cell => cell) {
    return state.map((row, y) => row.map((cell, x) => mapFn(cell, x, y)));
  }

  toggleCell(state: GameState, x: number, y: number) {
    return [
      ...state.slice(0, y),
      [...state[y].slice(0, x), 1 - state[y][x], ...state[y].slice(x + 1)],
      ...state.slice(y + 1)
    ];
  }

  getNeighbors(state: GameState, x: number, y: number) {
    const up = y ? y - 1 : this.height - 1;
    const down = y !== this.height - 1 ? y + 1 : 0;
    const right = x !== this.width - 1 ? x + 1 : 0;
    const left = x ? x - 1 : this.width - 1;

    return [
      state[up][x],
      state[up][right],
      state[y][right],
      state[down][right],
      state[down][x],
      state[down][left],
      state[y][left],
      state[up][left]
    ];
  }

  getNextGeneration(state: GameState): GameState {
    return this.mapState(state, (cellState, cellX, cellY) => {
      const neighbors = this.getNeighbors(state, cellX, cellY);
      const liveNeighbors = neighbors.filter(Boolean).length;

      if (cellState === CellState.ALIVE) {
        if (liveNeighbors < 2) return CellState.DEAD;
        if (liveNeighbors > 3) return CellState.DEAD;
      }

      if (liveNeighbors === 3) return CellState.ALIVE;

      return cellState;
    });
  }
}
