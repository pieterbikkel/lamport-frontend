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

  if(!questionnaire || !questionnaire.questions) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={questionnaire.name} itemsToRemove={["vragenlijst"]}/>
      <DetailTopSection pageTitle={questionnaire.name} buttonTitle={'Wijzigen'} navigationLink={'/interventies/vragenlijst/wijzigen/' + questionnaire.id} subheading={'Vragenlijst'}/>
      <table className="questionnaire-detail-table">
        <tbody>
          <tr>
            <td className="table-min-width">Interventie</td>
            <td>Vraag</td>
          </tr>
        </tbody>
      </table>
      <div className="questionnaires">
        {
          questionnaire.questions.map((question, index) => {
            return (
              <div>
                <h4>{"Vraag " + (index + 1) + ": " + question.name}</h4>
                {
                  question.answers.map(answer => {
                    return (
                      <div>
                        <p>{answer.answerText}</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default QuestionnaireDetail;
