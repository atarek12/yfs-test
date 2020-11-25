import React, { useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';

import DisplayMode from './components/DisplayMode';
import EditMode from './components/EditMode';
import Search from './components/Search';
import { sheetToObject } from '../../shared/util/sheetToObject';
import { mapStatus } from '../../shared/util/mapStatus';
import { useFetch } from '../../shared/hooks/useFetch';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

export default function ListTasks() {
	const [tasks, setTasks] = useState([]);
	const statusesArrRef = useRef([]);

	const { sendRequest: getTasks } = useFetch();
	const { isLoading, sendRequest: getStatuses } = useFetch();

	useEffect(() => {
		let isActive = true;

		const fetchTasks = async () => {
			try {
				const response = await getTasks('./assets/Tasks.xlsx');
				const tasksDataWithoutStatuses = sheetToObject(response);

				const sheet = await getStatuses('./assets/Statuses.xlsx');
				const { newTasksWithStatus, statusesArr } = mapStatus(
					sheet,
					tasksDataWithoutStatuses
				);

				if (isActive) {
					statusesArrRef.current.value = statusesArr;
					setTasks(newTasksWithStatus);
				}
			} catch (err) {}
		};

		fetchTasks();

		return () => {
			isActive = false;
		};
	}, [getTasks, getStatuses]);

	const [mode, setMode] = useState('display');
	const [editData, setEditData] = useState({});

	const toggleMode = (taskId) => {
		if (taskId) {
			const data = tasks.find((task) => task.task_id === taskId);
			setEditData(data);
		}
		setMode((prevState) => (prevState === 'display' ? 'edit' : 'display'));
	};

	const deleteTask = (taskId) => {
		const newListTasks = tasks.filter((task) => task.task_id !== taskId);
		setTasks(newListTasks);
	};

	const editTask = (newTask) => {
		const newListTasks = tasks.map((oldTask) =>
			oldTask.task_id === newTask.task_id ? newTask : oldTask
		);
		setTasks(newListTasks);
		setMode('display');
	};

	const [filteredTasks, setFilteredTasks] = useState(null);

	const filterTasks = useCallback(
		(status, date) => {
			let filterdData = null;

			if (status) {
				filterdData = tasks.filter((task) => task.task_status === status);
			}

			const currentData = filterdData || tasks;

			if (date.startDate && date.endDate) {
				filterdData = currentData.filter(
					(task) =>
						moment(task.task_datetime) > moment(date.startDate) &&
						moment(task.task_datetime) < moment(date.endDate)
				);
			} else if (date.startDate) {
				filterdData = currentData.filter((task) => {
					return moment(task.task_datetime) > moment(date.startDate);
				});
			} else if (date.endDate) {
				filterdData = currentData.filter((task) => {
					return moment(task.task_datetime) < moment(date.endDate);
				});
			}

			setFilteredTasks(filterdData);
		},
		[tasks]
	);

	const resetFilters = () => {
		setFilteredTasks(null);
	};

	return (
		<React.Fragment>
			{isLoading && (
				<div className="center">
					<LoadingSpinner asOverlay />
				</div>
			)}

			<Search
				statuses={isLoading ? [] : statusesArrRef.current.value}
				filterTasks={filterTasks}
				resetFilters={resetFilters}
			/>

			<hr style={{ width: '50vw' }} />

			{mode === 'display' ? (
				<DisplayMode
					tasks={filteredTasks || tasks}
					deleteTask={deleteTask}
					toggleMode={toggleMode}
				/>
			) : (
				<EditMode
					task={editData}
					editTask={editTask}
					toggleMode={toggleMode}
					statuses={isLoading ? [] : statusesArrRef.current.value}
				/>
			)}
		</React.Fragment>
	);
}
