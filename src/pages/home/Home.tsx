import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import './Home.css';
import gsap from 'gsap';
import React, { useEffect, useRef } from "react";
import Ring from "../../assets/images/ring.svg";

function Home() {

  let home: any = useRef(null)

  useEffect(() => {
    gsap.to(home, {x: 400, duration: 2})
  })
  
    return (
      <div className="home">

        <Breadcrumb/>
        <h1 className='home-text' ref={el => home = el}>Home</h1>
        <div className='jitai-animation'>
          <img className='ring ring1' src={Ring} alt="ring animatie"/>
          <img className='ring ring2' src={Ring} alt="ring animatie"/>
          <img className='ring ring3' src={Ring} alt="ring animatie"/>
        </div>
      </div>
    );
}

export default Home;
