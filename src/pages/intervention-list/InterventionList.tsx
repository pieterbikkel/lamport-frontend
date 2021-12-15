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
      id: "/interventies/commandos/0",
      name: "Commando",
    },
    {
      id: "/interventies/vragen/0",
      name: "Vraag",
    },
    {
      id: "/interventies/vragenlijst/0",
      name: "Commando",
    },
  ];

  const changeDropdown = (val:string) => {
    navigate(val);
  }

  return (
    <div>
      <Breadcrumb/>
      <TopSection pageTitle={'Interventies'} buttonTitle={'Toevoegen'} dropdownOptions={dropdownOptions} onClick={search} onChange={changeDropdown}/>
        {interventions.map(intervention => {
          return (
            <div key={intervention.id}>
              <TableRow title={intervention.name} onEditLink={"/interventies/" + intervention.type + "/wijzigen/" + intervention.id} onDeleteClick={() => deleteIntervention(intervention.id)} navigationLink={"/interventies/" + intervention.type  + "/" + intervention.id}/>
            </div>
          )
        })}
    </div>
  );
}

export default InterventionList;
