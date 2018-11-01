'use strict';

import React from 'react';
import Modal from 'react-modal';

const COMPONENT_TITLE = "Selected Option";

const OptionModal = (props) => (
	<Modal
		isOpen={!!props.selectedOption}
		contentLabel={COMPONENT_TITLE}
		onRequestClose={props.handleCloseModal}
		closeTimeoutMS={200}
		className="modal"
	>
		<h3 className="modal__title">{COMPONENT_TITLE}</h3>
		{ props.selectedOption && <p className="modal__body">{props.selectedOption}</p> }
		<button
			className="button"
			onClick={props.handleCloseModal}>Okay
		</button>
	</Modal>
);

export default OptionModal;
