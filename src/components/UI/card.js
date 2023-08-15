import classes from "./css/section.module.css"
const Card = (props) => {
    return (
        <section
            className="fullscreen py-5"
            style={{ backgroundColor: "grey"}}
        >
            <div className={`container`}>
                <div className="text-middle">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className={`col-lg-8 center p-30 background-white b-r-6 ${classes.rollOut}`}>
                            {props.children}
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Card;
