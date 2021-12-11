import { useState } from 'react';
import { OpeningGroup } from '../learn/OpeningGroup';
import OpeningTabs from '../learn/OpeningTabs';
import Search from '../utils/Search';


const TYPE_MAP = {
  'traps': ' Traps',
  'train': ' to Train with'
};

export default function OpeningsList({ groups, type, multiSelect = false, onOpeningSelected = () => {}}) {
  const [selectedOpenings, setSelectedOpenings] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [tab, setTab] = useState('');

  const filteredOpeningGroups = groups
    ?.filter((g) => {
      const firstMove = g.options[0].value[0].san;
      return tab === '' || (tab === 'other' && firstMove !== 'e4' && firstMove !== 'd4') || tab === firstMove;
    })
    .filter((g) => {
      const searchWords = searchInput.split(' ');
      return searchWords.filter((w) => g.label.toLowerCase().includes(w.toLowerCase())).length > 0;
    });

  const addToList = (opening) => {
    console.log('add:', opening);
    const newOpenings = [...selectedOpenings, opening];
    setSelectedOpenings(newOpenings);
    onOpeningSelected(newOpenings);
  };

  const removeFromList = (opening) => {
    console.log('remove');
    const newOpenings = selectedOpenings.filter((o) => o.id !== opening.id);
    setSelectedOpenings(newOpenings);
    onOpeningSelected(newOpenings);
  };


  return (
    <>
      <OpeningTabs tab={tab} setTab={setTab} />
      <Search
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={`Search Chess Opening${TYPE_MAP[type] || 's'} by Name`}
        value={searchInput}
      />
      <div className="flex-row flex-wrap">
        {filteredOpeningGroups.length > 0 ? (
          filteredOpeningGroups.map((g) => !multiSelect ?
            <OpeningGroup key={g.label} group={g} type={type} /> :
            <OpeningGroup key={g.label} group={g} type={type} activeLink={false} onSelect={selected => selected ? addToList(g) : removeFromList(g)}/>)
        ) : (
          <div className="pad-10-lr">No results</div>
        )}
      </div>
    </>
  );
}
