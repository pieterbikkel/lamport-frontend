import './QuestionEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import QuestionDTO from '../../dto/QuestionDTO';
import QuestionService from '../../services/intervention/question/QuestionService';

const QuestionEdit : React.FC = () => {
  const [question, setQuestion] = useState({} as QuestionDTO);
  const [service, setService] = useState({} as QuestionService);
  const [errors, setErrors] = useState({} as any);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      const service = new QuestionService();
      setService(service)
      await service.create(question)
        .then(() => {
          toast.success("Vraag aangemaakt!");
          navigate("/vragen");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service
        .update(question)
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
	//TODO: Implement
    setQuestion(new QuestionDTO());
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({...question, [e.target.id]: e.target.value})
  }

  return (
    <div>
      <Breadcrumb lastItem={question.name}/>
      <h2>{isEdit ? question.name + " Wijzigen" : "Vraag aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={question.name} errors={errors.name}/>
        <br/>
        <Input placeholderText={'Vraag'} inputName={'question'} inputType={'text'} inputLabel={'Vraag'} onChange={handleChange} value={question.question} errors={errors.question}/>
        <br/>
		{/* <Input placeholderText={'Antwoord'} inputName={'answer'} inputType={'text'} inputLabel={'Antwoord'} onChange={handleChange} value={question.answers} errors={errors.answer}/> */}
        <br/>
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default QuestionEdit
