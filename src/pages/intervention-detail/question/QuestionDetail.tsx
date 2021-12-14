import './QuestionDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../../components/detail-top-section/DetailTopSection';
import QuestionDTO from '../../../dto/QuestionDTO';
import QuestionService from '../../../services/intervention/question/QuestionService';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';

function QuestionDetail() {
  const [question, setQuestion] = useState({} as QuestionDTO);

  const params = useParams();
  useEffect(() => {
    const Service = new QuestionService();
    Service.loadOne(id)
    .then(val => {
      setQuestion(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div>
      <Breadcrumb lastItem={question.question}/>
      <DetailTopSection pageTitle={question.question} buttonTitle={'Wijzigen'} navigationLink={'/vragen/wijzigen/' + question.id} subheading={'vragen'}/>
    </div>
  );
}

export default QuestionDetail;
