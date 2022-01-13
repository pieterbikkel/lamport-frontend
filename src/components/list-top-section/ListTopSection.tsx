import React from 'react';
import Button from '../button/Button';
import './ListTopSection.css';
import { useNavigate } from "react-router-dom";
import Searchbar from '../searchbar/Searchbar';
import Select from '../select/Select';
import Option from '../select/Option'

interface Props {
    pageTitle: String,
    buttonTitle: string,
    navigationLink?: string,
    onChange?: any,
    onSearchChange: any,
    dropdownOptions?: Option[];
    onSubmit?: any
}

function TopSection({ pageTitle, buttonTitle, navigationLink, onChange, dropdownOptions, onSubmit, onSearchChange }: Props ) {

    const navigate = useNavigate();

    return (
        <div className="top-section-component">
            <h2>{pageTitle}</h2>
            <div className="top-section-component-right">
                <Searchbar placeholderText={'zoeken...'} inputName={'search'} onSubmit={onSubmit} onSearchChange={onSearchChange}/>
                {navigationLink && <Button title={buttonTitle} onClick={() => navigate(navigationLink)} />}
                {dropdownOptions && <Select placeholderText={'Toevoegen'} selectName={''} selectLabel={''} options={dropdownOptions} onChange={onChange}/>}
            </div>
        </div>
    );
}

export default TopSection;