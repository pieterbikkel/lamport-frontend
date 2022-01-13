import './AreaList.css';
import { useState, useEffect, FormEvent } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import AreaService from '../../services/AreaService';
import AreaDTO from '../../dto/AreaDTO';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

function AreaList() {
  const [areas, setAreas] = useState([] as AreaDTO[]);
  const [service, setService] = useState({} as AreaService);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const areaService = new AreaService();
    setService(areaService)
    areaService.loadAll()
    .then(val => {
      setAreas(val);
    })
  }, [])

  const deleteArea = (id: number) => {
    setAreas(areas.filter(x => x.id !== id))
    service.delete(id);
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
      <TopSection pageTitle={'Gebieden'} buttonTitle={'Toevoegen'} navigationLink={'/gebieden/wijzigen/0'} onSubmit={onSubmit} onSearchChange={handleSearchChange}/>
        {areas.filter((area) => {
          if(searchTerm === "") return area
          if(area.name.toLowerCase().includes(searchTerm.toLowerCase())) return area
        }).map(area => {
          return (
            <div key={area.id}>
              <TableRow title={area.name} onEditLink={"/gebieden/wijzigen/" + area.id} onDeleteClick={() => deleteArea(area.id)} navigationLink={"/gebieden/" + area.id}/>
            </div>
          )
        })}
    </div>
  );
}

export default AreaList;
