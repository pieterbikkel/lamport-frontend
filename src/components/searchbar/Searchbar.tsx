import React from 'react';
import './Searchbar.css';
import { useState, useEffect, FormEvent } from 'react';
import SearchIcon from '../../assets/icons/search.svg';

interface Props {
    placeholderText: string,
    inputName: string,
    onSubmit: any,
    onSearchChange: any
}

function Searchbar({ placeholderText, inputName, onSubmit, onSearchChange }: Props ) {


    return (
        <div className="searchbar-container">
            <form onSubmit={onSubmit} className='searchbar-container'>
                <input className="searchbar" type="text" name={inputName} onChange={onSearchChange} placeholder={placeholderText + "..."}/>
                <input className="search-button" type="submit"/>
            </form>
        </div>
    );
}

export default Searchbar;