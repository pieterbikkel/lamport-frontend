import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import './Home.css';
import gsap from 'gsap';
import React, { useEffect, useRef } from "react";
import Chippr from "../../assets/images/chippr.svg";

function Home() {

  let home: any = useRef(null)
  let chipprLogo: any = useRef(null)

  useEffect(() => {
    gsap.to(home, {x: 400, duration: 2, skewX: 45})
    gsap.to(chipprLogo, {duration: 2, skewX: 45})
  })
  
    return (
      <div className="home">

        <Breadcrumb/>
        <h1 className='home-text' ref={el => home = el}>Home</h1>
        <div className='jitai-animation'>
          <img className='chippr' ref={el => chipprLogo = el} src={Chippr} alt="Chippr logo"/>
        </div>
      </div>
    );
}

export default Home;
