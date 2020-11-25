import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './modalTransision.css';
import classes from './Modal.module.css';

const ModalOverlay = (props) => {
	const content = (
		<div className={classes.modal + ' ' + props.className} style={props.style}>
			<header className={classes.header + ' ' + props.headerClass}>
				<h2>{props.header}</h2>
				<button
					className={classes.closeBtn + ' ' + props.closeBtnClass}
					onClick={props.onCancel}
				>
					&#10006;
				</button>
			</header>

			<div className={classes.content + ' ' + props.contentClass}>
				{props.children}
			</div>

			<footer className={classes.footer + ' ' + props.footerClass}>
				{props.footer}
			</footer>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames="modal"
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
