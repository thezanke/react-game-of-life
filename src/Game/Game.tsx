import React from 'react';
import { GameBoard } from './GameBoard';
import { useGame } from './useGame';

enum ICONS {
  STOP = '■',
  PLAY = '▶',
  NEXT = '✚'
}

type Props = {
  width?: number;
  height?: number;
};

const Game: React.FC<Props> = ({ width = 50, height = 50 }) => {
  const { actions, playing, board } = useGame(width, height);

  return (
    <>
      <button onClick={actions.togglePlaying}>{playing ? ICONS.STOP : ICONS.PLAY}</button>
      <button onClick={actions.nextGeneration}>{ICONS.NEXT}</button>
      <GameBoard board={board} actions={actions} />
    </>
  );
};

export default Game;
