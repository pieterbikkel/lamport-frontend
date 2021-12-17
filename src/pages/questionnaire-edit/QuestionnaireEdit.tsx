import './QuestionnaireEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import QuestionnaireDTO from '../../dto/QuestionnaireDTO';
import QuestionnaireService from '../../services/intervention/questionnaire/QuestionnaireService';

const QuestionnaireEdit : React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState({} as QuestionnaireDTO);
  const [service, setService] = useState({} as QuestionnaireService);
  const [errors, setErrors] = useState({} as any);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      const service = new QuestionnaireService();
      setService(service)
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
	//TODO: Implement
    setQuestionnaire(new QuestionnaireDTO());
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuestionnaire({...questionnaire, [e.target.id]: e.target.value})
  }

  return (
    <div>
      <Breadcrumb lastItem={questionnaire.name}/>
      <h2>{isEdit ? questionnaire.name + " Wijzigen" : "Vragenlijst aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={questionnaire.name} errors={errors.name}/>
        <br/>
        <Input placeholderText={'Vragen'} inputName={'questions'} inputType={'text'} inputLabel={'Vragen'} onChange={handleChange} value={questionnaire.questions} errors={errors.questions}/>
        <br/>
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default QuestionnaireEdit
