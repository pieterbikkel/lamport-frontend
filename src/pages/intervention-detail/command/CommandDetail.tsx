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
    const service = new CommandService()
    service.loadOne(id)
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
      <table className="question-detail-table">
        <tbody>
          <tr>
            <td className="table-min-width">Interventie</td>
            <td>Commando</td>
          </tr>
          <tr>
            <td className="table-min-width">Commando</td>
            <td>{command.commandText}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CommandDetail;
