import React from 'react';
import { GameBoard } from './GameBoard.component';
import { useGame } from './useGame.hook';

enum ICONS {
  STOP = '■',
  PLAY = '▶',
  NEXT = '✚',
  CLEAR = '❌'
}

type Props = {
  width?: number;
  height?: number;
};

export const Game: React.FC<Props> = ({ width = 50, height = 50 }) => {
  const { actions, playing, board } = useGame(width, height);

  return (
    <div className="game">
      <h1>Life.</h1>
      <div className="controls">
        <button onClick={actions.clear}>{ICONS.CLEAR}</button>
        <button onClick={actions.togglePlaying}>{playing ? ICONS.STOP : ICONS.PLAY}</button>
        <button onClick={actions.nextGeneration}>{ICONS.NEXT}</button>
      </div>
      <GameBoard board={board} actions={actions} />
    </div>
  );
};
