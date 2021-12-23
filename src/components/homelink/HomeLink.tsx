import { Link } from "react-router-dom";
import './HomeLink.css';

interface Props {
    name: string,
    link: string,
    image: any
}

function HomeLink({ name, link, image }: Props ) {
    
    return (
        <div className='home-link'>
            <Link to={link}>
                <img className='home-link__image' src={image} alt={name}/>
                <p>{name}</p>
            </Link>
        </div>
    );
}

export default HomeLink;