import React from 'react';
import { GameState } from './GameEngine.service';
import { GameActions } from './useGame.hook';

type Props = {
  board: GameState;
  actions: GameActions;
};

export const GameBoard: React.FC<Props> = ({ board, actions }) => {
  return (
    <div className="board">
      {board.map((row, y) => (
        <div
          key={`row-${y}`}
          className="row"
          children={row.map((cell, x) => (
            <div
              key={`cell-${y}-${x}`}
              className={'cell' + (cell ? ' active' : '')}
              onClick={() => actions.toggleCell(x, y)}
            />
          ))}
        />
      ))}
    </div>
  );
};
