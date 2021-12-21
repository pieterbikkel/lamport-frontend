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
  
  if(!question || !question.answers) {
    return <div></div>
  }

  return (
    <div> 
      <Breadcrumb lastItem={question.question}/>
      <DetailTopSection pageTitle={question.name ?? ""} buttonTitle={'Wijzigen'} navigationLink={'/interventies/vraag/wijzigen/' + question.id} subheading={'Interventie'}/>
      <table className="question-detail-table">
        <tbody>
          <tr>
            <td className="table-min-width">Interventie</td>
            <td>Vraag</td>
          </tr>
        </tbody>
      </table>
      <div className="questions">
        <h4>Antwoorden</h4>
        {
        question.answers.map(answer => {
          return <p id={answer.id.toString()}>{answer.answerText}</p>
        })
        }
      </div>
    </div>  
  );
}

export default QuestionDetail;
