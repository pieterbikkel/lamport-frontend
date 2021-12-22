import './AreaEdit.css';
import '../../services/AreaService';
import { useState, useEffect, FormEvent } from 'react';
import AreaService from '../../services/AreaService';
import AreaDTO from '../../dto/AreaDTO';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Map from '../../components/map/Map';
import { Circle } from 'leaflet';
import createCircle from '../../adapters/circle/CircleFactory';

const AreaEdit : React.FC = () => {
  const [area, setArea] = useState({} as AreaDTO);
  const [service, setService] = useState({} as AreaService);
  const [errors, setErrors] = useState({} as any);
  const [circles, setCircles] = useState([] as Circle[]);
  const [mapKey, setMapKey] = useState(0 as number);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(area)
        .then(() => {
          toast.success("Gebied aangemaakt!");
          navigate("/gebieden");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service
        .update(area)
        .then(response => {
          toast.success("Gebied bijgewerkt!");
          navigate("/gebieden");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    const areaService = new AreaService();
    setService(areaService)
    if(!isEdit) {
      setArea(new AreaDTO())
    } else {
      areaService.loadOne(id)
      .then(val => {
        setArea(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setArea({...area, [e.target.id]: e.target.value})
  }

    //This effect is needed because we sometimes want to update the circles whenever the location updates
    useEffect(() => {
      if(area.longitude === undefined) {
        setCircles([]);
        return;
      }
      
      setCircles([createCircle(area.longitude, area.latitude, area.radius, "red")]);
      setMapKey(mapKey + 1);
    }, [area]);

  if(!area.longitude) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={area.name}/>
      <h2>{isEdit ? area.name + " Wijzigen" : "Gebied aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <div className='flex-container'>
          <div>
            <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={area.name} errors={errors.name}/>
            <br/>
            <Input placeholderText={'Lengtegraad'} inputName={'longitude'} inputType={'number'} inputLabel={'Lengtegraad'} onChange={handleChange} value={area.longitude === 0 ? "" : area.longitude }  errors={errors.longitude}/>
            <br/>
            <Input placeholderText={'Breedtegraad'} inputName={'latitude'} inputType={'number'} inputLabel={'Breedtegraad'} onChange={handleChange} value={area.latitude === 0 ? "" : area.latitude} errors={errors.latitude}/>
            <br/>
            <Input placeholderText={'Straal in meters'} inputName={'radius'} inputType={'number'} inputLabel={'Straal'} onChange={handleChange} value={area.radius === 0 ? "" : area.radius} errors={errors.radius}/>
            <br/>
            <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
          </div>
          <Map key={mapKey} viewCoords={[area.latitude, area.longitude]} viewZoom={15} circles={circles}></Map>
        </div>
      </form>
    </div>
  );
}

export default AreaEdit
