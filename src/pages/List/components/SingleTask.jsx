import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import classes from './DisplayMode.module.css';
import Modal from '../../../shared/components/UIElements/Modal';

export default function SingleTask({ deleteTask, task, toggleMode }) {
	const [viewModal, setViewModal] = useState(false);
	const toggleModal = () => {
		setViewModal((prevState) => !prevState);
	};

	useEffect(() => {
		document.addEventListener('keyup', (event) => {
			if (event.key === 'Escape') {
				setViewModal(false);
			}
		});
	}, []);

	return (
		<React.Fragment>
			<Modal
				show={viewModal}
				onCancel={toggleModal}
				header={` Task Number: ${task.task_id}`}
				footer="**This is read only, not editable**"
			>
				<div className={classes.modal_wrapper}>
					<div>
						<label> Customer Name: </label>
						<span> {task.customer_name} </span>
					</div>
					<div>
						<label> Customer Phone: </label>
						<span> {task.customer_phone} </span>
					</div>
					<div>
						<label> Customer Email: </label>
						<span> {task.customer_email} </span>
					</div>
					<div>
						<label> Task Status: </label>
						<span> {task.task_status} </span>
					</div>
					<div>
						<label> Task Date: </label>
						<span>
							{moment(task.task_datetime).format('DD-MM-YYYY hh:mm A')}
						</span>
					</div>
					<div>
						<label> Barcode: </label>
						<span> {task.barcode} </span>
					</div>
				</div>
			</Modal>

			<tr className={classes.row}>
				<td>{task.task_id}</td>
				<td>{task.customer_name}</td>
				<td>{task.customer_phone}</td>
				<td>{task.customer_email}</td>
				<td>{task.task_status}</td>
				<td>{moment(task.task_datetime).format('DD-MM-YYYY hh:mm A')}</td>
				<td>
					<button
						className={classes.view + ' ' + classes.button}
						onClick={toggleModal}
					>
						<FontAwesomeIcon size="lg" icon={faEye} />
					</button>
					<button
						className={classes.edit + ' ' + classes.button}
						onClick={() => toggleMode(task.task_id)}
					>
						<FontAwesomeIcon size="lg" icon={faEdit} />
					</button>
					<button
						className={classes.delete + ' ' + classes.button}
						onClick={() => deleteTask(task.task_id)}
					>
						<FontAwesomeIcon size="lg" icon={faTrash} />
					</button>
				</td>
			</tr>
		</React.Fragment>
	);
}
