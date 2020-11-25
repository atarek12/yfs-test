import { useEffect, useRef, useState } from 'react';

import classes from './Search.module.css';

export default function Search({ statuses, filterTasks, resetFilters }) {
	const selectRef = useRef();
	const [searchQuery, setSearchQuery] = useState({
		status: '',
		startDate: '',
		endDate: '',
	});

	let statusOptions;
	if (statuses) {
		statusOptions = statuses.map((option, index) => (
			<option key={index} value={option}>
				{option}
			</option>
		));
	}

	const handleChnage = (event) => {
		const newQuery = {
			...searchQuery,
			[event.target.name]: event.target.value,
		};
		setSearchQuery(newQuery);
	};

	const clearStatus = () => {
		setSearchQuery({ ...searchQuery, status: '' });
		selectRef.current.value = 'initial';
	};

	const clearStartDate = () => {
		setSearchQuery({ ...searchQuery, startDate: '' });
	};

	const clearEndDate = () => {
		setSearchQuery({ ...searchQuery, endDate: '' });
	};

	const handleReset = () => {
		selectRef.current.value = 'initial';
		setSearchQuery({ status: '', startDate: '', endDate: '' });
		resetFilters();
	};

	useEffect(() => {
		filterTasks(searchQuery.status, {
			startDate: searchQuery.startDate,
			endDate: searchQuery.endDate,
		});
	}, [filterTasks, searchQuery]);

	return (
		<div className="container center">
			<div className={classes.wrapper}>
				<span>Chose Status</span>
				<select
					ref={selectRef}
					className={classes.status}
					name="status"
					defaultValue="initial"
					onChange={handleChnage}
				>
					<option value="initial" disabled hidden>
						Filter by Status
					</option>
					{statusOptions}
				</select>
				<button className={classes.clear_btn} onClick={clearStatus}>
					CLEAR
				</button>

				<div>
					<span>Chose Start Date</span>
					<input
						type="datetime-local"
						value={searchQuery.startDate}
						name="startDate"
						onChange={handleChnage}
					/>
					<button className={classes.clear_btn} onClick={clearStartDate}>
						CLEAR
					</button>
					<br />
					<span>Chose End Date</span>
					<input
						type="datetime-local"
						value={searchQuery.endDate}
						name="endDate"
						onChange={handleChnage}
					/>
					<button className={classes.clear_btn} onClick={clearEndDate}>
						CLEAR
					</button>
				</div>

				<button className={classes.reset_btn} onClick={handleReset}>
					RESET ALL
				</button>
			</div>
		</div>
	);
}
