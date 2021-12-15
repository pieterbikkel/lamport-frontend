import './InterventionList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import InterventionDTO from '../../dto/InterventionDTO';
import InterventionService from '../../services/intervention/InterventionService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

function InterventionList() {
  const [interventions, setInterventions] = useState([] as InterventionDTO[]);
  const [service, setService] = useState({} as InterventionService);


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

  const dropdownoptions = [
    {
      id: 1,
      name: "Commando",
      link: "/interventies/commandos/0"
    },
    {
      id: 2,
      name: "Vraag",
      link: "/interventies/vragen/0"
    },
    {
      id: 3,
      name: "Commando",
      link: "/interventies/vragenlijst/0"
    },
  ];

  return (
    <div>
      <Breadcrumb/>
      <TopSection pageTitle={'Interventies'} buttonTitle={'Toevoegen'} dropdownOptions={dropdownoptions} onClick={search}/> {/* TODO: dropdown */}
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
