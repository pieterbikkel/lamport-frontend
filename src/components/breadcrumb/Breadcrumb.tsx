import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import "./Breadcrumb.css";
import { useNavigate, useLocation } from 'react-router-dom';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const pathnames = location.pathname.split("/").filter(x => x);

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
          return isLast ? (
            <Typography key={name}><h4>{name}</h4></Typography>
          ) : (
            <Link underline="hover" color="inherit" key={name} onClick={() => navigate(routeTo)}>
              <h4 className='hover-green'>{name}</h4>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default Breadcrumb;
