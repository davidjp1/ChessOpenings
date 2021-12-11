import { useMemo, useState } from 'react';
import { Chessboard as Board } from 'react-chessboard';
import Link from 'next/link';
import Chess from 'chess.js';

import { chessPieces } from '../../data/consts';
import { useChessboardSize } from '../../functions/hooks';
import { useSettings } from '../../context/settings-context';

const GLOWING_EFFECT_STYLES = {
  boxShadow: '0px 0px 20px #fff'
};


export function OpeningGroup({ group, type, activeLink = true, onSelect = () => {} }) {

  const { chessboardSize } = useChessboardSize();
  const { theme } = useSettings();
  const customPieces = useMemo(() => chessPieces(theme?.value), [theme]);
  const [selected, setSelected] = useState(false);

  const game = new Chess();
  const opening = group.options[0].value;
  for (let i = 0; i < 5; i++) {
    game.move({ from: opening[i].from, to: opening[i].to });
  }

  const contents = <div className="chessboard-header group-board" style={{ height: chessboardSize }}>
    <div className="group-board-underlay">
      <Board
        id={group.label}
        arePiecesDraggable={false}
        boardOrientation={'white'}
        boardWidth={chessboardSize}
        customDarkSquareStyle={theme?.darkSquareStyle}
        customLightSquareStyle={theme?.lightSquareStyle}
        customPieces={customPieces}
        position={game?.fen()} />
    </div>
    <div className="group-board-overlay" style={{ width: chessboardSize, height: chessboardSize }} />
  </div>;

  const onClicked = () => {
    const newState = !selected;
    setSelected(newState);
    onSelect(newState);
  };
  
  return (
    <div className="group-section" onClick={onClicked}>
      <div className="group-heading-container flex-row" style={selected ? GLOWING_EFFECT_STYLES : {}}>
        <h3 className="group-heading">{group.label}</h3>
        <h4 className="group-heading margin-left-auto">{group.options.length}</h4>
      </div>
      {activeLink ? <Link href={`/${type}/${encodeURIComponent(group.label)}`}>{contents}</Link> : <div>{contents}</div>}
    </div>
  );
}
