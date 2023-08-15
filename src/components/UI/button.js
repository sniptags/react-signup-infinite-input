const Button = (props) => {
    return (
        <button className={`btn ${props.classes}`} type={props.type} onClick={props.onClick}>
            {props.text}
        </button>
    );
};
export default Button