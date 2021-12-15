import { useNavigate } from 'react-router-dom';
import Option from '../select/Option';
import './Dropdown.css';
import DropwdownOption from './DropdownOption';

interface Props {
    placeholderText: string,
    options: DropwdownOption[],
    width?: string;
}

function Dropdown({ placeholderText, options, width = "normal" }: Props ) {

    const navigate = useNavigate();

    const changeSelect = (e:React.ChangeEvent<HTMLSelectElement>):any => {
        const selectedOption = options[e.target.options.selectedIndex - 1];

        if(selectedOption === undefined) {
            return;
        }

        navigate(selectedOption.link);
    }

    return (
        <div>
            <select className={"select select-" + width} onChange={changeSelect}>
                <option value="0">{placeholderText}</option>
                {options.map(option => {
                    return (
                        <option className="option" value={option.name} key={option.id}>{option.name}</option>
                    )}
                )}
            </select>
        </div>
    );
}

export default Dropdown;