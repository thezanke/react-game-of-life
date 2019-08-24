import React, { useState, useMemo, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { GameActions, GameState } from './types';
import { GameEngine } from './GameEngine';

type Props = {
  width?: number;
  height?: number;
};

const Game: React.FC<Props> = ({ width = 50, height = 50 }) => {
  const game = useMemo(() => new GameEngine(width, height), [width, height]);
  const [playing, updatePlaying] = useState<Boolean>(false);
  const [board, updateBoard] = useState<GameState>(game.createState(height, width));

  const actions: GameActions = useMemo(
    () => ({
      togglePlaying() {
        updatePlaying(!playing);
      },
      toggleCell(x, y) {
        updateBoard(board => game.toggleCell(board, x, y));
      },
      nextGeneration: () => {
        updateBoard(board => game.getNextGeneration(board));
      }
    }),
    [game, playing, updatePlaying, updateBoard]
  );

  useEffect(() => {
    if (playing) {
      const interval = setInterval(actions.nextGeneration, 33);
      return () => clearInterval(interval);
    }
  }, [playing, actions]);

  return (
    <>
      <button onClick={actions.togglePlaying}>{playing ? 'stop' : 'go'}</button>
      <button onClick={actions.nextGeneration}>⏭</button>
      <GameBoard board={board} actions={actions} />
    </>
  );
};

export default Game;
