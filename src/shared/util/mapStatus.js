import XLSX from 'xlsx';

export const mapStatus = (sheet, tasks) => {
	const newData = new Uint8Array(sheet);
	const workbook = XLSX.read(newData, { type: 'array' });
	const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
	const sheetData = XLSX.utils.sheet_to_json(first_worksheet, {
		header: 1,
	});

	let statusesArr = [];
	sheetData.forEach((row, index) => {
		if (index > 0) {
			statusesArr.push(row[1]);
		}
	});

	const statusesObj = { ...statusesArr };

	const newTasksWithStatus = tasks.map((task) => {
		return {
			...task,
			task_status: statusesObj[task.task_status],
		};
	});

	return { newTasksWithStatus, statusesArr };
};
