import './QuestionnaireDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../../components/detail-top-section/DetailTopSection';
import QuestionnaireDTO from '../../../dto/QuestionnaireDTO';
import QuestionnaireService from '../../../services/intervention/questionnaire/QuestionnaireService';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';

function QuestionnaireDetail() {
  const [questionnaire, setQuestionnaire] = useState({} as QuestionnaireDTO);

  const params = useParams();
  useEffect(() => {
    const Service = new QuestionnaireService();
    Service.loadOne(id)
    .then(val => {
      setQuestionnaire(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div>
      <Breadcrumb lastItem={questionnaire.name}/>
      <DetailTopSection pageTitle={questionnaire.name} buttonTitle={'Wijzigen'} navigationLink={'/vragenlijsten/wijzigen/' + questionnaire.id} subheading={'vragenlijsten'}/>
    </div>
  );
}

export default QuestionnaireDetail;
