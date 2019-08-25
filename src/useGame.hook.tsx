import { useState, useMemo, useEffect } from 'react';
import { GameEngine, GameState } from './GameEngine.service';

export interface GameActions {
  togglePlaying(): void;
  toggleCell(x: number, y: number): void;
  nextGeneration(): void;
  clear(): void;
}

export const useGame = (width: number, height: number) => {
  const game = useMemo(() => new GameEngine(width, height), [width, height]);
  const [playing, updatePlaying] = useState<Boolean>(false);
  const [board, updateBoard] = useState<GameState>(game.createState(height, width));

  const actions: GameActions = useMemo(
    () => ({
      clear() {
        updateBoard(game.createState(height, width));
      },
      togglePlaying() {
        updatePlaying(p => !p);
      },
      toggleCell(x, y) {
        updateBoard(board => game.toggleCell(board, x, y));
      },
      nextGeneration: () => {
        updateBoard(board => {
          const [nextBoard, empty] = game.getNextGeneration(board);
          if (empty) updatePlaying(false);
          return nextBoard;
        });
      }
    }),
    [height, width, game]
  );

  useEffect(() => {
    if (playing) {
      const interval = setInterval(actions.nextGeneration, 1000 / 60);
      return () => clearInterval(interval);
    }
  }, [playing, actions]);

  return { actions, playing, board };
};
