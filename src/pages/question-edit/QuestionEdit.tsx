import './QuestionEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import QuestionDTO from '../../dto/QuestionDTO';
import QuestionService from '../../services/intervention/question/QuestionService';
import AnswerDTO from '../../dto/AnswerDTO';
import TrashIcon from '../../assets/icons/delete.svg';

const QuestionEdit : React.FC = () => {
  const [question, setQuestion] = useState({} as QuestionDTO);
  const [service, setService] = useState({} as QuestionService);
  const [errors, setErrors] = useState({} as any);

  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      await service.create(question)
        .then(() => {
          toast.success("Vraag aangemaakt!");
          navigate("/vragen");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service.update(question)
        .then(response => {
          toast.success("Vraag bijgewerkt!");
          navigate("/vragen");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    const questionService = new QuestionService();
    setService(questionService)
    if(!isEdit) {
      let questionDTO: QuestionDTO = new QuestionDTO();
      setQuestion(questionDTO);
    } else {
      questionService.loadOne(id)
      .then(val => {
        setQuestion(val);
      })
    }
  }, [])

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

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({...question, [e.target.id]: e.target.value})
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

  if(!question || !question.answers) {
    return <div></div>
  }

  return (
    <div>
      <Breadcrumb lastItem={question.name}/>
      <h2>{isEdit ? question.name + " Wijzigen" : "Vraag aanmaken"}</h2>
      <div className='edit-page'>
        <div className='form'>
          <form onSubmit={onSubmit}>
            <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={question.name} errors={errors.name}/>
            <br/>
            <Input placeholderText={'Vraag'} inputName={'question'} inputType={'text'} inputLabel={'Vraag'} onChange={handleChange} value={question.question} errors={errors.question}/>
            <br/>
          </form>
          <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
        </div>
        <div className="submit-button">
            <button value="Voeg toe" onClick={() => addAnswer()}>Voeg antwoord toe</button>
        </div>
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
  );
}

export default QuestionEdit;
