import React, {useState, useEffect} from 'react'; // using React hooks
import ReactMapGL, {Marker, Popup} from 'react-map-gl'; // using mapbox api

import marker from './marker.png'; // image of map pin. Will need to find one with transparent background
import { mongo } from 'mongoose';

// hardcoded 2 locations as pins. Will have to replace this with MongoDB Parking data
const mongoParkingSpots = [{coordinates: [33.985673, -118.455888], user_ID: 10000, user_name: 'Catherine', wait_time: '10'},
                          {coordinates: [33.982185, -118.438087], user_ID: 10001, user_name: 'Amruth', wait_time: '15'}];

const MapComponent = () => {
  // use React hooks to declare a state variable called viewport. This will be the entire map where the center is at [33.987909, -118.470693] in Los Angeles.
  const [viewport, setViewport] = useState({
    latitude: 33.987909,
    longitude: -118.470693,
    width: '90vw',
    height: '90vh',
    zoom: 10
  });

  // selectedPark is a state variable that contains which map pin the user has clicked
  const [selectedPark, setSelectedPark] = useState(null);

  // this method will make the map pin popup go away when escape key is pressed
  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, []);

  return (
    <div>
      <div id="mapbox" style={{margin: '5vw', textAlign: 'center'}}>
        <ReactMapGL // ReactMapGL is the entire map element
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoieWE4NTA1MDkiLCJhIjoiY2s1MGFwd2h5MGszMzNqbmVhZWZqMmI4MyJ9.1X0GGZVNGDyxCfacWadlgw" // my mapbox account token that allows us to use mapbox api
          mapStyle="mapbox://styles/ya850509/ck51pt5z70dot1cqj6aix253v" // this style is made from my mapbox account
          onViewportChange={viewport => {
            setViewport(viewport);
          }} // this enables users to drag and move the map by setting viewport again whenever there's a change
        >
          {mongoParkingSpots.map(park => ( // map the MongoDB array of parking spots
            <Marker // this JSX element is imported from MapBox that will mark different locations on the map
              key={park.user_ID} // each parking spot should have a unique key of who were in the spot
              latitude={park.coordinates[0]}
              longitude={park.coordinates[1]}
            >
              <button className="marker-btn" onClick={(e) => {
                e.preventDefault();
                console.log('clicked: ', park);
                setSelectedPark(park); // when the map pin button is clicked, we will set the state of selectedPark to be the current park the user clicked
              }}>
                <img src={marker} style={{backgroundColor: 'transparent'}} width="15" height="20" />
              </button>
            </Marker>
          ))}
          
          {selectedPark ? ( // ternary operator: if there is a selectedPark, show a popup window
            <Popup 
              latitude={selectedPark.coordinates[0]}
              longitude={selectedPark.coordinates[1]}
              onClose={() => { // when the x on the top right of the pop up is clicked
                setSelectedPark(null); // set the state of selectedPark back to null
              }}
            >
              <div style={{textAlign: 'left'}}>
                Who parked here: {selectedPark.user_name}<br />
                Available in: {selectedPark.wait_time} minutes<br />
                Parking coordinates: {selectedPark.coordinates[0]}, {selectedPark.coordinates[1]}
              </div>
            </Popup>
          ) : null}
          
        </ReactMapGL>
      </div>
    </div>
  );
};

export default MapComponent;

