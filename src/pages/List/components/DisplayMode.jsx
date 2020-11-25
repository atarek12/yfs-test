import SingleTask from './SingleTask';

import classes from './DisplayMode.module.css';

export default function DisplayMode({ tasks, deleteTask, toggleMode }) {
	const displayAllTasks = tasks.map((task) => {
		return (
			<SingleTask
				key={task.task_id}
				task={task}
				deleteTask={deleteTask}
				toggleMode={toggleMode}
			/>
		);
	});

	return (
		<div className={classes.wrapper + ' container'}>
			<h2>LIST OF TASKS</h2>

			<div className={classes.table_wrapper}>
				<table className={classes.table}>
					<thead className={classes.thead}>
						<tr>
							<th>ID</th>
							<th>NAEM</th>
							<th>PHONE</th>
							<th>EMAIL</th>
							<th>STATUS</th>
							<th>DATE</th>
							<th>ACTIONS</th>
						</tr>
					</thead>

					<tbody className={classes.tbody}>{displayAllTasks}</tbody>
				</table>
			</div>
		</div>
	);
}
