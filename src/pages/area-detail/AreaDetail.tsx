import './AreaDetail.css';
import '../../services/AreaService';
import { useState, useEffect } from 'react';
import AreaService from '../../services/AreaService';
import AreaDTO from '../../dto/AreaDTO';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { Circle } from 'leaflet';
import createCircle from '../../adapters/circle/CircleFactory';
import Map from '../../components/map/Map';

function AreaDetail() {
  const [area, setArea] = useState({} as AreaDTO);
  const [circles, setCircles] = useState([] as Circle[]);
  const [mapKey, setMapKey] = useState(0 as number);

  const params = useParams();
  useEffect(() => {
    new AreaService().loadOne(id)
    .then(val => {
      setArea(val);
      setCircles([createCircle(val.longitude, val.latitude, val.radius, "red")]);
      setMapKey(mapKey + 1);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  if(!area.longitude) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={area.name}/>
      <DetailTopSection pageTitle={area.name} buttonTitle={'Wijzigen'} navigationLink={'/gebieden/wijzigen/' + area.id} subheading={'Gebieden'}/>
      <div className='flex-container'>
        <table className="area-detail-table">
          <tbody>
            <tr>
              <td className="table-min-width">Lengtegraad:</td>
              <td>{area.longitude + "°"}</td>
            </tr>
            <tr>
              <td className="table-min-width">Breedtegraad:</td>
              <td>{area.latitude + "°"}</td>
            </tr>
            <tr>
              <td className="table-min-width">Straal:</td>
              <td>{area.radius + " meter"}</td>
            </tr>
          </tbody>
        </table>
        <Map key={mapKey} viewCoords={[area.latitude, area.longitude]} viewZoom={15} circles={circles}></Map>
      </div>
    </div>
  );
}

export default AreaDetail;
