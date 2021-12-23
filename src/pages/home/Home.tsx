import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import './Home.css';
import AreaIcon from "../../assets/icons/area-icon.svg"
import LocationIcon from "../../assets/icons/location-icon.svg"
import InterventionIcon from "../../assets/icons/intervention-icon.svg"
import GoalIcon from "../../assets/icons/goal-icon.svg"
import FranchiseIcon from "../../assets/icons/franchise-icon.svg"
import PersonIcon from "../../assets/icons/person-icon.svg"
import RoleIcon from "../../assets/icons/role-icon.svg"
import HomeLink from '../../components/homelink/HomeLink';

function Home() {

  
    return (
      <div className="home">

        <Breadcrumb/>
        
        <h1>Home</h1>
        
        <div className='home__links'>
          <HomeLink name={'Gebieden'} link={'/gebieden'} image={AreaIcon}/>
          <HomeLink name={'Locaties'} link={'/locaties'} image={LocationIcon}/>
          <HomeLink name={'Interventies'} link={'/interventies'} image={InterventionIcon}/>
          <HomeLink name={'Doelstellingen'} link={'/doelstellingen'} image={GoalIcon}/>
          <HomeLink name={'Franchises'} link={'/franchises'} image={FranchiseIcon}/>
          <HomeLink name={'Gebruikers'} link={'/gebruikers'} image={PersonIcon}/>
          <HomeLink name={'Rollen'} link={'/rollen'} image={RoleIcon}/>
        </div>
      </div>
    );
}

export default Home;
