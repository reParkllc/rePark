import React, {useState, useEffect, useContext} from 'react'; // using React hooks
import ReactMapGL, {Marker, Popup, GeolocateControl} from 'react-map-gl'; // using mapbox api
import Geocoder from 'react-map-gl-geocoder'; // coverts user inputted address into coordinates
import marker from './marker.png'; // image of map pin. Will need to find one with transparent background
import { UserContext } from '../../../client/contexts/UserContext.js';

// hardcoded 2 locations as pins. Will have to replace this with MongoDB Parking data
const mongoParkingSpots = [{latitude: 33.985673, longitude: -118.455888, user_ID: 10000, user_name: 'Catherine', wait_time: '10'},
                          {latitude: 33.982185, longitude: -118.438087, user_ID: 10001, user_name: 'Amruth', wait_time: '15'}];

const MapComponent = () => {
  // use React hooks to declare a state variable called viewport. This will be the entire map where the center is at [33.987909, -118.470693] in Los Angeles.
  const [viewport, setViewport] = useState({
    latitude: 33.987909,
    longitude: -118.470693,
    width: '90vw',
    height: '80vh',
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

  // mapRef is needed for geocoder
  const mapRef = React.useRef();

  // this would zoom in to the location of the address the user inputted in the geocoder search box
  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return setViewport({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  }

  // markers array is the state variable that will be populated with each individual marker object
  const [markers, setMarkers] = React.useState([]);

  const [shouldAddPin, setShouldAddPin] = React.useState(false);

  const { user } = useContext(UserContext);

  const [time, setTime] = React.useState(new Date(Date.now()).toUTCString());

  // when the user clicks on the map, add the coordinates into the markers array
  const handleClick = ({ lngLat: [longitude, latitude], target }) => { // the parameter is the PointerEvent in react-map-gl
    console.log('target.className', target.className);
    if (target.className !== 'mapboxgl-ctrl-geocoder--input' && shouldAddPin) { // as long as the user is not clicking in the search box
      console.log(`clicked, longitude: ${longitude}, latitude: ${latitude}`);
      setMarkers(markers => [...markers, {latitude, longitude}]); // add a marker at the location
      console.log('markers: ', markers);
      setShouldAddPin(shouldAddPin => !shouldAddPin);

      let utcDate = new Date(new Date().toUTCString());
      let utcDateAdd10Min = new Date(utcDate.getTime() + 10*60000);
      setTime(time => {
        return utcDateAdd10Min.toLocaleTimeString('en-US'); // this will set time to be the current time + 10 minutes, format example: 5:20:08 PM
      });

      // send the coordinates and user id to the backend
      fetch('/api/parking', {
        method: 'POST',
        body: JSON.stringify({
          longitude,
          latitude,
          user_id: user.id
        }),
        headers: { 'content-type': 'application/json', 'Accept': 'application/json'}
      });
    }

    // if the user clicks on the add pin button, toggle the state for shouldAddPin
    if (target.id === 'add_pin') {
      setShouldAddPin(shouldAddPin => !shouldAddPin);
    }
  };

  const [events, setEvents] = React.useState({});

  const logDragEvent = (name, event) => {
    setEvents(events => { [...events, {[name]: lngLat}]});
  };

  const onMarkerDragStart = ({ lngLat: [lng, lat] }) => {
    logDragEvent('onDragStart', event);
  };

  const onMarkerDrag = ({ lngLat: [lng, lat] }) => {
    logDragEvent('onDrag', event);
  };

  const onMarkerDragEnd = ({ lngLat: [lng, lat] }) => {
    logDragEvent('onDragEnd', event);
    setMarkers(markers => [...markers, {latitude, longitude}]);
  };

  return (
    <div>
      <link href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css' rel='stylesheet' />
      <div id="mapbox" style={{margin: '5vw', textAlign: 'center'}}>
        <ReactMapGL // ReactMapGL is the entire map element
          onClick={handleClick} // add markers upon clicks
          ref={mapRef}
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoieWE4NTA1MDkiLCJhIjoiY2s1MGFwd2h5MGszMzNqbmVhZWZqMmI4MyJ9.1X0GGZVNGDyxCfacWadlgw" // my mapbox account token that allows us to use mapbox api
          mapStyle="mapbox://styles/ya850509/ck51pt5z70dot1cqj6aix253v" // this style is made from my mapbox account
          onViewportChange={viewport => {
            setViewport(viewport);
          }} // this enables users to drag and move the map by setting viewport again whenever there's a change
        >

          <Geocoder // this is the address search box at the bottom left of the map
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken="pk.eyJ1IjoieWE4NTA1MDkiLCJhIjoiY2s1MGFwd2h5MGszMzNqbmVhZWZqMmI4MyJ9.1X0GGZVNGDyxCfacWadlgw"
            reverseGeocode={true}
            position={"bottom-left"}
          />

          <GeolocateControl // this asks the user if they allow sharing their location, if they do, the map automatically drops a blue dot at their current location
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
            showUserLocation={true}
          />

          {markers.map((park, i) => ( // map the array of parking spots
            <Marker // this JSX element is imported from MapBox that will mark different locations on the map
              key={i}
              latitude={park.latitude}
              longitude={park.longitude}
              // draggable={true}
              // onDragStart={onMarkerDragStart}
              // onDrag={onMarkerDrag}
              // onDragEnd={onMarkerDragEnd}
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

          {mongoParkingSpots.map(park => ( // map the MongoDB array of parking spots
            <Marker // this JSX element is imported from MapBox that will mark different locations on the map
              key={park.user_ID} // each parking spot should have a unique key of who were in the spot
              latitude={park.latitude}
              longitude={park.longitude}
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
              latitude={selectedPark.latitude}
              longitude={selectedPark.longitude}
              onClose={() => { // when the x on the top right of the pop up is clicked
                setSelectedPark(null); // set the state of selectedPark back to null
              }}
            >
              <div style={{textAlign: 'left'}}>
                Who parked here: {user.name}<br />
                Available today at: {time}<br />
                Parking coordinates: {selectedPark.latitude}, {selectedPark.longitude}
              </div>
            </Popup>
          ) : null}
          
          <button id="add_pin" style={{position: 'fixed', bottom: '15vw', left: '6.5vw', height: '40px', width: '80px', borderRadius: '1vw'}}>
            + Add pin
          </button>

        </ReactMapGL>
      </div>
    </div>
  );
};

export default MapComponent;

