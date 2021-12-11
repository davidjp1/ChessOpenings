import { useData } from '../context/data-context';
import { SEO } from '../components/utils/SEO';
import { LoadingSpinner } from '../components/utils/LoadingSpinner';
import OpeningsList from '../components/learn/OpeningsList';
import { useState } from 'react';
import Select from 'react-select';
import { colourChoices } from '../data/consts';
import Button from '../components/utils/Button';


export default function Train() {
  const { openingGroups, loadingError } = useData();
  const [selectedOpenings, setSelectedOpenings] = useState([]);
  const [selectedSide, setSelectedSide] = useState('white');

  // TODO: Make error component
  if (loadingError) {
    return <div>Error</div>;
  }
  
  const handleSubmit = () => {
    console.log(selectedOpenings, selectedSide);
  };

  return (
    <>
      <div className="flex-column container">
        <SEO
          description="Test your Chess openings knowledge and train to remember the moves to make for different variations. Try to get as many correct as possible and if you forget any, a handy link will be provided to brush up on the forgotten moves."
          title="train"
          path="/train"
        />
        <h1 className="page-title pad-10-lr flex-row flex-align">
          <i className="las la-graduation-cap learn-title-icon" />
          Train your Chess openings knowledge
        </h1>
        {openingGroups ? (
          <OpeningsList groups={openingGroups} type="train" multiSelect={true} onOpeningSelected={openingList => setSelectedOpenings(openingList)} />
        ) : (
          <LoadingSpinner
            img={
              <img
                className="navbar-logo-image"
                src="/media/images/logo2.png"
                alt="Chess Openings Logo"
                width={100}
                height={100}
              />
            }
            text="Loading..."
          />
        )}
        <div className="flex-column container" style={{ 'rowGap': '20px' }}>
          <div>
            <h3>Selected openings:</h3>
            <ul>
              {selectedOpenings.map(opening => (
                <li key={opening.label}>{opening.label}</li>
              ))}
            </ul>
          </div>
          <Select
            options={colourChoices}
            defaultValue={colourChoices[0]}
            onChange={(change) => setSelectedSide(change.value)}
            isSearchable={false}
          />
          <Button
            onClick={handleSubmit}
            disabled={selectedOpenings.length === 0}>
            Start
          </Button>
        </div>
      </div>
    </>
  );
}
