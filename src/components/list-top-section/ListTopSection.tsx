import React from 'react';
import Button from '../button/Button';
import './ListTopSection.css';
import { useNavigate } from "react-router-dom";
import Searchbar from '../searchbar/Searchbar';
import Dropdown from '../dropdown/Dropdown';
import DropwdownOption from '../dropdown/DropdownOption';

interface Props {
    pageTitle: String,
    buttonTitle: string,
    navigationLink?: string,
    dropdownOptions?: DropwdownOption[],
    onChange?: any,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function TopSection({ pageTitle, buttonTitle, navigationLink, dropdownOptions, onChange, onClick }: Props ) {

    const navigate = useNavigate();

    return (
        <div className="top-section-component">
            <h2>{pageTitle}</h2>
            <div className="top-section-component-right">
                <Searchbar placeholderText={'zoeken...'} inputName={'search'} onClick={onClick}/>
                {navigationLink && <Button title={buttonTitle} onClick={() => navigate(navigationLink)} />}
                {dropdownOptions && <Dropdown placeholderText={buttonTitle} options={dropdownOptions}/>}
            </div>
        </div>
    );
}

export default TopSection;