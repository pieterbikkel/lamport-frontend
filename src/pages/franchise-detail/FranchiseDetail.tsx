import './FranchiseDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailTopSection from '../../components/detail-top-section/DetailTopSection';
import FranchiseDTO from '../../dto/FranchiseDTO';
import FranchiseService from '../../services/franchise/FranchiseService';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

function FranchiseDetail() {
  const [franchise, setFranchise] = useState({} as FranchiseDTO);
  const [service, setService] = useState({} as FranchiseService);

  const params = useParams();
  useEffect(() => {
    const franchiseService = new FranchiseService();
    setService(franchiseService)
    franchiseService.loadOne(id)
    .then(val => {
      setFranchise(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div>
      <Breadcrumb lastItem={franchise.name}/>
      <DetailTopSection pageTitle={franchise.name} buttonTitle={'Wijzigen'} navigationLink={'/franchises/wijzigen/' + franchise.id} subheading={'Franchises'}/>
    </div>
  );
}

export default FranchiseDetail;
