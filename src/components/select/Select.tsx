import Option from './Option';
import './Select.css';

interface Props {
    placeholderText: string,
    selectName: string,
    selectLabel: string,
    options: Option[],
    value?: string,
    onChange:any,
    width?: string;
    errors?: string[];
}

function Select({ placeholderText, selectName, selectLabel, options, value = "", onChange, width = "normal", errors = [] }: Props ) {

    const changeSelect = (e:React.ChangeEvent<HTMLSelectElement>):any => {
        const selectedOption = options[e.target.options.selectedIndex - 1];
        onChange(selectedOption === undefined ? 0 : selectedOption.id);
    }

    return (
        <div>
            <h4 className={"select-label " + "select-label-" + (errors.length !== 0 ? "error" : "")}>{selectLabel}</h4>
            <select value={value != "" ? value : "0"} className={selectName === "" ? "select dropwdown" : "select select-" + width + " select-" + (errors.length !== 0 ? "error" : "")} id={selectName} name={selectName} onChange={changeSelect}>
                {selectName === "" && <option value="0">{placeholderText}</option>}
                {selectName.length > 1 && <option value="0">{placeholderText + "..."}</option>}
                {options.map(option => {
                    return (
                        <option value={option.id} key={option.id}>{option.name}</option>
                    )}
                )}
            </select>
            {errors.map(error => {
                return <p className="error">{error}</p>
            })}
        </div>
    );
}

export default Select;