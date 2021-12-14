import './CommandEdit.css';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';
import SubmitButton from '../../components/submit-button/SubmitButton';
import CommandDTO from '../../dto/CommandDTO';
import CommandService from '../../services/intervention/command/CommandService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

const CommandEdit : React.FC = () => {
  const [command, setCommand] = useState({} as CommandDTO);
  const [service, setService] = useState({} as CommandService);
  const [errors, setErrors] = useState({} as any);
  
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!isEdit) {
      const service = new CommandService();
      setService(service)
      await service.create(command)
        .then(() => {
          toast.success("Commando aangemaakt!");
          navigate("/commandos");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    } else {
      await service
        .update(command)
        .then(response => {
          toast.success("Commando bijgewerkt!");
          navigate("/commandos");
        }).catch(err => {
          setErrors(err.response.data);
          return;
        });
    }
  }

  useEffect(() => {
    // const commandService = new CommandService();
    // setService(commandService)
    // if(!isEdit) {
    //   setCommand(new CommandDTO())
    // } else {
    //   commandService.loadOne(id)
    //   .then(val => {
    //     console.log(val);
    //     setCommand(val);
    //   })
    // }
    setCommand(new CommandDTO());
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCommand({...command, [e.target.id]: e.target.value})
  }

  return (
    <div>
      <Breadcrumb lastItem={command.name}/>
      <h2>{isEdit ? command.name + " Wijzigen" : "Commando aanmaken"}</h2>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Naam'} inputName={'name'} inputType={'text'} inputLabel={'Naam'} onChange={handleChange} value={command.name} errors={errors.name}/>
        <br/>
        <Input placeholderText={'Tekst'} inputName={'text'} inputType={'text'} inputLabel={'Tekst'} onChange={handleChange} value={command.text} errors={errors.name}/>
        <br/>
        <SubmitButton value={isEdit ? "Opslaan" : "Voeg toe"}/>
      </form>
    </div>
  );
}

export default CommandEdit
