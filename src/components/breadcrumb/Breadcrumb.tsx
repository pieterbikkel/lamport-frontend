import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import "./Breadcrumb.css";
import { useNavigate, useLocation } from 'react-router-dom';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

interface Props {
  lastItem?: string;
  itemsToRemove?: string[]
}

const Breadcrumb = ({lastItem, itemsToRemove = []}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  //Filter x => to prevent empty ones in the breadcrumbs
  let pathnames = location.pathname.split("/").filter(x => x);
  //Sometimes we want to remove pathnames from the breadcrumbs, if for example the link it will lead to is incorrect
  pathnames = [...pathnames.filter(x => itemsToRemove.find(y => y === x) === undefined)];

  return (
    <div className="breadcrumb" role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 ? (
          <Link underline="hover" color="inherit" onClick={() => navigate("/")}><h4 className='hover-green'>Home</h4></Link>
        ) : (
          <Typography><h4>Home</h4> </Typography>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const isEditPage = name.toUpperCase() === "WIJZIGEN";
          return isLast ? (
            <div key={name}>
              {lastItem && <Typography component={'span'} key={lastItem}><h4>{lastItem.charAt(0).toUpperCase() + lastItem.slice(1)}</h4></Typography>}
              {!lastItem && <Typography component={'span'} key={name}><h4>{name.charAt(0).toUpperCase() + name.slice(1)}</h4></Typography>}
            </div>
          ) : (
            <Link underline={(!isEditPage ? "hover" : "none")} color="inherit" key={name} onClick={() => !isEditPage ? navigate(routeTo) : {}}>
              <h4 className={!isEditPage ? "hover-green" : ""}>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default Breadcrumb;
