import './QuestionnaireEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import QuestionnaireDTO from '../../dto/QuestionnaireDTO';
import QuestionnaireService from '../../services/intervention/questionnaire/QuestionnaireService';
import QuestionDTO from '../../dto/QuestionDTO';
import TrashIcon from '../../assets/icons/delete.svg';
import AnswerDTO from '../../dto/AnswerDTO';
import InterventionDTO from '../../dto/InterventionDTO';
import InterventionService from '../../services/intervention/InterventionService';
import QuestionService from '../../services/intervention/question/QuestionService';

const QuestionnaireEdit : React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState({} as QuestionnaireDTO);
  const [service, setService] = useState({} as QuestionnaireService);
  const [errors, setErrors] = useState({} as any);
  const [intervention, setIntervention] = useState({} as InterventionDTO[]);
  const [question, setQuestion] = useState({} as QuestionDTO);

  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(questionnaire)
        .then(() => {
          toast.success("Vragenlijst aangemaakt!");
          navigate("/vragenlijst");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service.update(questionnaire)
        .then(response => {
          toast.success("Vragenlijst bijgewerkt!");
          navigate("/vragenlijst");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    const questionnaireService = new QuestionnaireService();
    const interventionService = new InterventionService();
    setService(questionnaireService)
    interventionService
      .loadAll()
      .then(question => {
        setIntervention(question);
      })
    if(!isEdit) {
      let questionnaireDTO: QuestionnaireDTO = new QuestionnaireDTO();
      setQuestionnaire(questionnaireDTO);
    } else {
      questionnaireService.loadOne(id)
      .then(val => {
        setQuestionnaire(val);
      })
    }
  }, [])

  const deleteQuestion = (id : number) : any => {
    questionnaire.questions = questionnaire.questions.filter(x => x.id !== id);
    setQuestionnaire(Object.assign({}, questionnaire));
  }

  const addQuestion = () : any => {
    const newQuestion = new QuestionDTO();
    let id = 1;
    if(questionnaire.questions.length !== 0) {
      id = Math.max(...questionnaire.questions.map(x => x.id)) + 1;
    }
    newQuestion.id = id;
    questionnaire.questions.push(newQuestion);
    setQuestionnaire(Object.assign({}, questionnaire));
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuestionnaire({...questionnaire, [e.target.id]: e.target.value})
  }

  const handleQuestionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const questionId = e.target.id;
    const question = questionnaire.questions.find(x => x.id.toString() === questionId);
    if(question !== undefined) {
      question.name = e.target.value;
      setQuestionnaire(Object.assign({}, questionnaire));
    }
  }

  const deleteAnswer = (id : number) : any => {
    question.answers = question.answers.filter(x => x.id !== id);
    setQuestion(Object.assign({}, question));
  }

  const addAnswer = () : any => {
    const newAnswer = new AnswerDTO();
    let id = 1;
    if(question.answers.length !== 0) {
      id = Math.max(...question.answers.map(x => x.id)) + 1;
    }
    newAnswer.id = id;
    question.answers.push(newAnswer);
    setQuestion(Object.assign({}, question));
  }

  const handleAnswerChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const answerId = e.target.id;
    const answer = question.answers.find(x => x.id.toString() === answerId);
    if(answer !== undefined) {
      answer.answerText = e.target.value;
      setQuestion(Object.assign({}, question));
    }
  }
  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  if(!questionnaire || !questionnaire.questions || !question || !question.answers) {
    return <div></div>
  }
  
  return (
    <div>
      <Breadcrumb lastItem={questionnaire.name}/>
      <h2>{isEdit ? questionnaire.name + " Wijzigen" : "Vragenlijst aanmaken"}</h2>

      <div className="edit-page">
        <div className="form">
         <form onSubmit={onSubmit}>
         <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={questionnaire.name} errors={errors.name}/>
         <br/>
      </form>
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </div>
      <div className="submit-button">
            <button value="Voeg toe" onClick={() => addQuestion()}>Voeg vraag toe</button>
      </div>
      <div className='questions'>
          {questionnaire.questions.map(question => {
            return <div className='add-row'>
              <Input placeholderText={'Vraag'} inputName={question.id.toString()} 
              value={question.name} onChange={handleQuestionChange}
              inputType={'text'} inputLabel={'Vraag'} errors={[]}           
              />
              <button value = "Verwijder vraag" className="trash table-row-button" onClick={() => deleteQuestion(question.id)}>
                <img className="table-row-icon" src={TrashIcon} alt="verwijder" />
              </button>
              </div>
          })}
          <div className='answers'>
          {question.answers.map(answer => {
            return <div className='add-row'>
              <Input placeholderText={'Antwoord'} inputName={answer.id.toString()} 
            value={answer.answerText} onChange={handleAnswerChange}
            inputType={'text'} inputLabel={'Antwoord'} errors={[]}           
            />
            <button value = "Verwijder antwoord" className="trash table-row-button" onClick={() => deleteAnswer(answer.id)}>
              <img className="table-row-icon" src={TrashIcon} alt="verwijder" />
            </button>
            </div>
          })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionnaireEdit;
