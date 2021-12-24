import './GoalList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import GoalDTO from '../../dto/GoalDTO';
import GoalService from '../../services/goal/GoalService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

function GoalList() {
  const [goals, setGoals] = useState([] as GoalDTO[]);
  const [service, setService] = useState({} as GoalService);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const goalService = new GoalService();
    setService(goalService)
    goalService.loadAll()
    .then(val => {
      setGoals(val);
    })
  }, [])

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(x => x.id !== id))
    service.delete(id);
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()

    setSearchTerm(e.target[0].value)
  }

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Breadcrumb/>
      <TopSection pageTitle={'Doelstellingen'} buttonTitle={'Toevoegen'} navigationLink={'/doelstellingen/wijzigen/0'} onSearchChange={handleSearchChange} onSubmit={onSubmit}/>
        {goals.filter((goal) => {
          if(searchTerm === "") return goal
          if(goal.name.toLowerCase().includes(searchTerm.toLowerCase())) return goal
        }).map(goal => {
          return (
            <div key={goal.id}>
              <TableRow title={goal.name} onEditLink={"/doelstellingen/wijzigen/" + goal.id} onDeleteClick={() => deleteGoal(goal.id)} navigationLink={"/doelstellingen/" + goal.id}/>
            </div>
          )
        })}
    </div>
  );
}

export default GoalList;
