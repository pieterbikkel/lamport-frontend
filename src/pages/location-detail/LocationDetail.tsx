import './LocationDetail.css';
import { useState, useEffect } from 'react';
import LocationService from '../../services/location/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import { Link, useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Map from '../../components/map/Map';
import { Circle } from 'leaflet';
import createCircle from '../../adapters/circle/CircleFactory';

function LocationDetail() {
  const [location, setLocation] = useState<LocationDTO>();
  const [circles] = useState([] as Circle[]);

  const params = useParams();

  useEffect(() => {
    const locationService = new LocationService();
    locationService.loadOne(id)
    .then(val => {
      setLocation(val)
      circles.push(createCircle(val.longitude, val.latitude, val.radius, "blue"))
      circles.push(createCircle(val.area.longitude, val.area.latitude, val.area.radius, "red"))
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  if(!location || !location.area || !location.linkedInterventions) {
    return null;
  }

  return (
    <div>
      <Breadcrumb lastItem={location.name}/>
      <DetailTopSection pageTitle={location.name} buttonTitle={'Wijzigen'} navigationLink={'/locaties/wijzigen/' + location.id} subheading={'Locaties'}/>
      <div className='flex-container'>
        <div>
          <table className="location-detail-table">
            <tbody>
              <tr>
                <td className="table-min-width">Gebied:</td>
                <td><Link to={"/gebieden/" + location.area.id}>{location.area.name}</Link></td>
              </tr>
              <tr>
                <td className="table-min-width">Franchise:</td>
                <td><Link to={"/franchises/" + location.franchise.id}>{location.franchise.name}</Link></td>
              </tr>
              <tr>
                <td className="table-min-width">Lengtegraad:</td>
                <td>{location.longitude + "??"}</td>
              </tr>
              <tr>
                <td className="table-min-width">Breedtegraad:</td>
                <td>{location.latitude + "??"}</td>
              </tr>
              <tr>
                <td className="table-min-width">Straal:</td>
                <td>{location.radius + " meter"}</td>
              </tr>
              <tr>
                <td className="table-min-width">Triggertijd:</td>
                <td>{location.delay + (location.delay > 1 ? " seconden" : " seconde")}</td>
              </tr>
            </tbody>
          </table>
          <div className="interventions">
            <h4>Interventies</h4>
            {
            location.linkedInterventions.length !== 0  ? 
            location.linkedInterventions.map(intervention => {
              return <p id={intervention.id.toString()}>{intervention.name}</p>
            }) : 
            <p>Er zijn nog geen gekoppelde interventies!</p>
            }
          </div>
        </div>
        <Map viewCoords={[location.latitude, location.longitude]} viewZoom={15} circles={circles}></Map>
      </div>
    </div>
  );
}

export default LocationDetail;
