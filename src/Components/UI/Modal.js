import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';


const Backdrop = props => {
    return <div onClick={props.onClose} className={classes.backdrop} />
};
const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};
const portalElement = document.getElementById("overlays");

const Modal = props => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    )
}

export default Modal;