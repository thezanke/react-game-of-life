import React from 'react';
import classnames from 'classnames';
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
        <div key={y} className="row">
          {row.map((active, x) => (
            <div key={x} className={classnames('cell', { active })} onClick={() => actions.toggleCell(x, y)} />
          ))}
        </div>
      ))}
    </div>
  );
};
