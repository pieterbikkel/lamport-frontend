import React from 'react';
import Button from '../button/Button';
import './ListTopSection.css';
import { useNavigate } from "react-router-dom";
import Searchbar from '../searchbar/Searchbar';
import Dropdown from '../dropdown/Dropdown';

interface Props {
    pageTitle: String,
    buttonTitle: string,
    navigationLink?: string,
    dropdownLinks?: string[],
    dropdownLabels?: string[],
    onChange?: any,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function TopSection({ pageTitle, buttonTitle, navigationLink, dropdownLinks, dropdownLabels, onChange, onClick }: Props ) {

    const navigate = useNavigate();

    return (
        <div className="top-section-component">
            <h2>{pageTitle}</h2>
            <div className="top-section-component-right">
                <Searchbar placeholderText={'zoeken...'} inputName={'search'} onClick={onClick}/>
                {navigationLink && <Button title={buttonTitle} onClick={() => navigate(navigationLink)} />}
                {(dropdownLinks && dropdownLabels) && <Dropdown placeholderText={buttonTitle} selectLabel={''} options={[]} onChange={onChange} />}
            </div>
        </div>
    );
}

export default TopSection;