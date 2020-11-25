import XLSX from 'xlsx';

export const sheetToObject = (sheet) => {
	const newData = new Uint8Array(sheet);
	const workbook = XLSX.read(newData, { type: 'array' });
	const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
	const sheetData = XLSX.utils.sheet_to_json(first_worksheet, {
		header: 1,
	});

	const tableHeader = sheetData[0];
	let tableData = [];
	sheetData.forEach((row, index) => {
		if (index > 0) {
			let newField = {};
			row.forEach((element, index) => {
				newField = { ...newField, [tableHeader[index]]: element };
			});
			tableData.push(newField);
		}
	});

	return tableData;
};
