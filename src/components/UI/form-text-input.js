const FormTextInput = (props) => {
    return (
        <div className={`col-lg-12 form-group`}>
            <label className="sr-only">{props.placeholder}</label>
            <input
                key={props.id}
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                className={`form-control form-control-lg ${props.classes}`}
                onChange={props.onChange}
                value={props.value}
                onBlur={props.onBlur}
            />
            <div id={`${props.id}-error`} className="is-invalid">{props.errorMessage}</div>
        </div>
    );
};
export default FormTextInput
