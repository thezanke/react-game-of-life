import React from 'react';
import { GameBoard } from './GameBoard.component';
import { useGame } from './useGame.hook';
import { GameState, CellState } from './GameEngine.service';

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

const sum = (t: number, v: CellState) => t + v;
const countLiving = (state: GameState) => state.reduce((t: number, r: CellState[]) => t + r.reduce(sum), 0);

export const Game: React.FC<Props> = ({ width = 50, height = 50 }) => {
  const { actions, playing, board } = useGame(width, height);

  const livingCount = countLiving(board);
  const buttonIcon = playing ? ICONS.STOP : ICONS.PLAY;

  return (
    <div className="game">
      <h1>life.</h1>
      <div className="controls">
        <button onClick={actions.clear}>{ICONS.CLEAR}</button>
        <button onClick={actions.togglePlaying}>{buttonIcon}</button>
        <button onClick={actions.nextGeneration}>{ICONS.NEXT}</button>
      </div>
      living: {livingCount}
      <GameBoard board={board} actions={actions} />
    </div>
  );
};
