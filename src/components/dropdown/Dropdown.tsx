import { useNavigate } from 'react-router-dom';
import Option from '../select/Option';
import './Dropdown.css';

interface Props {
    placeholderText: string,
    selectName?: string,
    selectLabel: string,
    options: string[],
    value?: string,
    onChange:any,
    width?: string;
}

function Dropdown({ placeholderText, selectName, selectLabel, options, value = "", onChange, width = "normal" }: Props ) {

    const navigate = useNavigate();

    return (
        <div>
            <h4 className="select-label">{selectLabel}</h4>
            <select value={value != "" ? value : "0"} className={"select select-" + width} id={selectName} name={selectName}>
                <option value="0">{placeholderText + "..."}</option>
                {options.map(option => {
                    return (
                        <option onClick={() => navigate(option)} value={option} key={option}>{selectName}</option>
                    )}
                )}
            </select>
        </div>
    );
}

export default Dropdown;