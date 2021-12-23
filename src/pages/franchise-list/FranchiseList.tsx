import './FranchiseList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import FranchiseService from '../../services/franchise/FranchiseService';
import FranchiseDTO from '../../dto/FranchiseDTO';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

function FranchiseList() {
  const [franchises, setFranchises] = useState([] as FranchiseDTO[]);
  const [service, setService] = useState({} as FranchiseService);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const franchiseService = new FranchiseService();
    setService(franchiseService)
    franchiseService.loadAll()
    .then(val => {
      setFranchises(val);
    })
  }, [])

  const deleteFranchise = (id: number) => {
    setFranchises(franchises.filter(x => x.id !== id))
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
      <TopSection pageTitle={'Franchises'} buttonTitle={'Toevoegen'} navigationLink={'/franchises/wijzigen/0'} onSearchChange={handleSearchChange} onSubmit={onSubmit} />
        {franchises.filter((franchise) => {
          if(searchTerm === "") return franchise
          if(franchise.name.toLowerCase().includes(searchTerm.toLowerCase())) return franchise
        }).map(franchise => {
          return (
            <div key={franchise.id}>
              <TableRow title={franchise.name} onEditLink={"/franchises/wijzigen/" + franchise.id} onDeleteClick={() => deleteFranchise(franchise.id)} navigationLink={"/franchises/" + franchise.id}/>
            </div>
          )
        })}
    </div>
  );
}

export default FranchiseList;
