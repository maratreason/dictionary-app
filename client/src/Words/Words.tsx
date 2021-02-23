import React, { useState } from "react";
import {
	InputAdornment,
	makeStyles,
	Paper,
	TableBody,
	TableCell,
	TableRow,
	Toolbar,
} from "@material-ui/core";
import { PeopleOutlineTwoTone, Search, Add as AddIcon, Close as CloseIcon, EditOutlined as EditOutlinedIcon } from "@material-ui/icons";
import WordsForm from "./WordsForm";
import useTable from "../components/useTable";
import * as employeeService from "../services/employeeService";
import { Controls } from "../components/controls/Controls";
import Popup from "../components/controls/Popup";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader/PageHeader";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "75%",
	},
	newButton: {
		position: "absolute",
		right: "10px"
	}
}));

const headCells = [
	{ id: "fullName", label: "Employee Name" },
	{ id: "email", label: "Email Address (Personal)" },
	{ id: "mobile", label: "Mobile Number" },
	{ id: "department", label: "Department" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

const Words = () => {
	const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);
	const [records, setRecords] = useState(employeeService.getAllEmployees());
	const [filterFn, setFilterFn] = useState({ fn: (items) => { return items } });
	const [openPopup, setOpenPopup] = useState(false);
	const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
	const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subtitle: ""});

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useTable(records, headCells, filterFn);

	const handleSearch = (e: Event) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === "") return items;
				else
					return items.filter((item) =>
						item.fullName.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = (employee, resetForm) => {
		if (employee.id === 0) {
			employeeService.insertEmployee(employee);
		} else {
			employeeService.updateEmployee(employee);
		}

		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setRecords(employeeService.getAllEmployees());
		setNotify({
			isOpen: true,
			message: "Submitted Successfully",
			type: "success"
		});
	};

	const openIpPopup = (item) => {
		setRecordForEdit(item);
		setOpenPopup(true);
	};

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false
		});
		employeeService.deleteEmployee(id);
		setRecords(employeeService.getAllEmployees());
		setNotify({
			isOpen: true,
			message: "Deleted Successfully",
			type: "success"
		});
	}

	return (
		<>
			<PageHeader
				title="New Employee"
				subtitle="Form design with validation"
				icon={<PeopleOutlineTwoTone />}
			/>
			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						label="Search Employees"
						className={classes.searchInput}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/>
					<Controls.Button
						text="Add New"
						variant="outlined"
						startIcon={<AddIcon />}
						className={classes.newButton}
						onClick={() => setOpenPopup(true)}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPagingAndSorting().map((item) => {
							return (
								<TableRow key={item.id}>
									<TableCell>{item.fullName}</TableCell>
									<TableCell>{item.email}</TableCell>
									<TableCell>{item.mobile}</TableCell>
									<TableCell>{item.department}</TableCell>
									<TableCell>
										<Controls.ActionButton color="primary">
											<EditOutlinedIcon fontSize="sm" onClick={() => openIpPopup(item)} />
										</Controls.ActionButton>
										<Controls.ActionButton color="secondary" onClick={() => setConfirmDialog({
											isOpen: true,
											title: "Are you sure to delete this record?",
											subtitle: "You can't undo this operation",
											onConfirm: () => onDelete(item.id)
										})}>
											<CloseIcon fontSize="sm" />
										</Controls.ActionButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
			<Popup
				title="Employee Form"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<WordsForm
					recordForEdit={recordForEdit}
					addOrEdit={addOrEdit}
				/>
			</Popup>
			<Notification
				notify={notify}
				setNotify={setNotify}
			/>
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
};

export default Words;
