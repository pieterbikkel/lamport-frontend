import './GoalEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import GoalDTO from '../../dto/GoalDTO';
import GoalService from '../../services/goal/GoalService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import TrashIcon from '../../assets/icons/delete.svg';
import ProfileQuestionsDTO from '../../dto/profileQuestionsDTO';

const GoalEdit : React.FC = () => {
  const [goal, setGoal] = useState({} as GoalDTO);
  const [service, setService] = useState({} as GoalService);
  const [errors, setErrors] = useState({} as any);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(goal)
        .then(() => {
          toast.success("Doelstelling aangemaakt!");
          navigate("/doelstellingen");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service
        .update(goal)
        .then(response => {
          toast.success("Doelstelling bijgewerkt!");
          navigate("/doelstellingen");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    const goalService = new GoalService();
    setService(goalService)
    if(!isEdit) {
      setGoal(new GoalDTO())
    } else {
      goalService.loadOne(id)
      .then(val => {
        setGoal(val);
      })
    }
  }, [])

  const deleteQuestion = (id : number) : any => {
    goal.profileQuestions = goal.profileQuestions.filter(x => x.id !== id);
    setGoal(Object.assign({}, goal));
  }

  const addQuestion = () : any => {
    const newProfileQuestion = new ProfileQuestionsDTO();
    let id = 1;
    if(goal.profileQuestions.length !== 0) {
      id = Math.max(...goal.profileQuestions.map(x => x.id)) + 1;
    }
    newProfileQuestion.id = id;
    goal.profileQuestions.push(newProfileQuestion);
    setGoal(Object.assign({}, goal));
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setGoal({...goal, [e.target.id]: e.target.value})
  }

  const handleQuestionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const questionId = e.target.id;
    const question = goal.profileQuestions.find(x => x.id.toString() === questionId);
    if(question !== undefined) {
      question.name = e.target.value;
      setGoal(Object.assign({}, goal));
    }
  }

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  if (!goal.profileQuestions) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={goal.name}/>
      <h2>{isEdit ? goal.name + " Wijzigen" : "Doelstelling aanmaken"}</h2>
      <div className="edit-page">
        <div className="form">
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={goal.name} errors={errors.name}/>
        <br/>
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
      </div>
      <div className='edit-question-container'>
          <div className='questions'>
            {goal.profileQuestions.map((question, index) => {
              return (
                <div className='add-row-goal'>
                  <Input placeholderText={'Vraag'} inputName={question.id.toString()} 
                    value={question.name} onChange={handleQuestionChange}
                    inputType={'text'} inputLabel={'Vraag ' + (index + 1)} errors={[]}           
                  />
                  <button value = "Verwijder vraag" className="trash trash-question-edit table-row-button" onClick={() => deleteQuestion(question.id)}>
                    <img className="table-row-icon" src={TrashIcon} alt="verwijder" />
                  </button>
                </div>
              )})}
          </div>
          <div className="submit-button-goal-question">
              <button value="Voeg toe" onClick={() => addQuestion()}>Voeg vraag toe</button>
          </div>
         </div>
        </div>
      </div>
  );
}

export default GoalEdit
