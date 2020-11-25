import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import classes from './EditMode.module.css';

export default function EditMode({ task, editTask, toggleMode, statuses }) {
	const [elements, setElements] = useState({
		...task,
		task_datetime: moment(task.task_datetime).format('YYYY-MM-DDThh:mm'),
	});

	const handleChange = (event) => {
		setElements((elements) => {
			return {
				...elements,
				[event.target.name]: event.target.value,
			};
		});
	};

	const handleSave = (event) => {
		event.preventDefault();
		editTask(elements);
	};

	const statusOptions = statuses.map((option, index) => (
		<option key={index} value={option}>
			{option}
		</option>
	));

	return (
		<div className="container">
			<div className={classes.header}>
				<h2>Edit Task Number: {elements.task_id}</h2>
				<button onClick={toggleMode}>
					GO BACK
					<FontAwesomeIcon color="#eb1429" icon={faArrowRight} />
				</button>
			</div>

			<form className={classes.box} onSubmit={handleSave}>
				<div>
					<label> Customer Name: </label>
					<input
						type="text"
						value={elements.customer_name}
						name="customer_name"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label> Customer Phone: </label>
					<input
						type="tel"
						value={elements.customer_phone}
						name="customer_phone"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label> Customer Email: </label>
					<input
						type="text"
						value={elements.customer_email}
						name="customer_email"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label> Task Status: </label>
					<select
						name="task_status"
						defaultValue={elements.task_status}
						onChange={handleChange}
					>
						{statusOptions}
					</select>
				</div>
				<div>
					<label> Task Date: </label>
					<input
						type="datetime-local"
						value={elements.task_datetime}
						name="task_datetime"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label> Barcode: </label>
					<input
						type="text"
						value={elements.barcode}
						name="barcode"
						onChange={handleChange}
					/>
				</div>
				<div>
					<input className={classes.saveBtn} type="submit" value="SAVE" />
				</div>
			</form>
		</div>
	);
}
