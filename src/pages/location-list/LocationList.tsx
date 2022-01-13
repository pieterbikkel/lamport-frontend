import './LocationList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import LocationService from '../../services/location/LocationService';
import LocationDTO from '../../dto/LocationDTO';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

function LocationList() {
  const [locations, setLocations] = useState([] as LocationDTO[]);
  const [locationServiceState, setLocationServiceState] = useState({} as LocationService);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const locationService = new LocationService();
    setLocationServiceState(locationService)
    locationService.loadAll()
    .then(val => {
      setLocations(val);
    })
  }, [])

  const deleteLocation = (locationId: number) => {
    setLocations(locations.filter(x => x.id !== locationId))
    locationServiceState.delete(locationId);
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()

    setSearchTerm(e.target[0].value)
  }

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Breadcrumb/>
      <TopSection pageTitle={'Locaties'} buttonTitle={'Toevoegen'} navigationLink={'/locaties/wijzigen/0'} onSubmit={onSubmit} onSearchChange={handleSearchChange}/>
        {locations.filter((location) => {
          if(searchTerm === "") return location
          if(location.name.toLowerCase().includes(searchTerm.toLowerCase())) return location
        }).map(location => {
          return (
            <div key={location.id}>
              <TableRow title={location.name} subtitle={location.area.name} onEditLink={"wijzigen/" + location.id} onDeleteClick={() => deleteLocation(location.id)} navigationLink={ "/locaties/" + location.id }/>
            </div>
          )
        })}
    </div>
  );
}

export default LocationList;
