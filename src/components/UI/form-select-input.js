import styles from './css/section.module.css'
const FormSelectInput = (props) => {
    return (
        <div className="col-lg-12 form-group">
            <label className="sr-only">{props.name}</label>
            <select key={props.id} id={props.id} name={props.name.toLowerCase()} onChange={props.onChange} value={props.selected} className={`form-control form-control-lg ${styles.rollLeft} ${props.classes}`}>
                <option value="" hidden>Select {props.name}</option>
                {props.formData.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            <div id={`${props.id}-error`} className="is-invalid">{props.errorMessage}</div>
        </div>
    );
};
export default FormSelectInput;