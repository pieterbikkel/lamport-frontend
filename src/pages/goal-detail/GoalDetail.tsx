import './GoalDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';
import GoalDTO from '../../dto/GoalDTO';
import GoalService from '../../services/goal/GoalService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { userInfo } from 'os';
import QuestionService from '../../services/intervention/question/QuestionService';
import ProfileQuestionsDTO from '../../dto/profileQuestionsDTO';

function GoalDetail() {
  const [goal, setGoal] = useState({} as GoalDTO);

  const params = useParams();
  useEffect(() => {
    const goalService = new GoalService();
    goalService.loadOne(id)
    .then(val => {
      setGoal(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }
  
  const id: number = Number.parseInt(params.id);

  if(!goal.profileQuestions) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={goal.name}/>
      <DetailTopSection pageTitle={goal.name} buttonTitle={'Wijzigen'} navigationLink={'/doelstellingen/wijzigen/' + goal.id} subheading={'Doelstelling'}/>
      <div className="profile_questions">
        <h4>Profielvragen</h4>
            {
            goal.profileQuestions.length !== 0  ? 
            goal.profileQuestions.map(questions => {
              return <p id={questions.id.toString()}>{questions.name}</p>
            }) : 
            <p>Er zijn nog geen gekoppelde profielvragen!</p>
            }
          </div>
    </div>
  );
}

export default GoalDetail;
