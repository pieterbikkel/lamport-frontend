import './CommandDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../../components/detail-top-section/DetailTopSection';
import CommandDTO from '../../../dto/CommandDTO';
import CommandService from '../../../services/intervention/command/CommandService';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';

function CommandDetail() {
  const [command, setCommand] = useState({} as CommandDTO);

  const params = useParams();
  useEffect(() => {
    const Service = new CommandService();
    Service.loadOne(id)
    .then(val => {
      setCommand(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div>
      <Breadcrumb lastItem={command.name}/>
      <DetailTopSection pageTitle={command.name} buttonTitle={'Wijzigen'} navigationLink={'/commando/wijzigen/' + command.id} subheading={'Commando'}/>
    </div>
  );
}

export default CommandDetail;
