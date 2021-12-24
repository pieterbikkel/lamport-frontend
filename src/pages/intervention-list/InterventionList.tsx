import './InterventionList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import InterventionDTO from '../../dto/InterventionDTO';
import InterventionService from '../../services/intervention/InterventionService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { useNavigate } from 'react-router-dom';

function InterventionList() {
  const [interventions, setInterventions] = useState([] as InterventionDTO[]);
  const [service, setService] = useState({} as InterventionService);
  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const interventionService = new InterventionService();
    setService(interventionService)
    interventionService.loadAll()
    .then(val => {
      setInterventions(val);
    })
  }, [])

  const deleteIntervention = (id: number) => {
    setInterventions(interventions.filter(x => x.id !== id))
    service.delete(id);
  }

  const search = () => {
    console.log("search")
  }

  const dropdownOptions = [
    {
      id: "/interventies/commando/wijzigen/0",
      name: "Commando",
    },
    {
      id: "/interventies/vraag/wijzigen/0",
      name: "Vraag",
    },
    {
      id: "/interventies/vragenlijst/wijzigen/0",
      name: "Vragenlijst",
    },
  ];

  const changeDropdown = (val:string) => {
    navigate(val);
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
      <TopSection pageTitle={'Interventies'} buttonTitle={'Toevoegen'} dropdownOptions={dropdownOptions} onSearchChange={handleSearchChange} onChange={changeDropdown} onSubmit={onSubmit}/>
        {interventions.filter((area) => {
          if(searchTerm === "") return area
          if(area.name.toLowerCase().includes(searchTerm.toLowerCase())) return area
        }).map(intervention => {
          return (
            <div key={intervention.id} >
              <TableRow title={intervention.name} subtitle={intervention.type} onEditLink={"/interventies/" + intervention.type + "/wijzigen/" + intervention.id} onDeleteClick={() => deleteIntervention(intervention.id)} navigationLink={"/interventies/" + intervention.type  + "/" + intervention.id}/>
            </div>
          )
        })}
    </div>
  );
}

export default InterventionList;
