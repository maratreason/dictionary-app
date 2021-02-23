"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var WordsForm_1 = require("./WordsForm");
var useTable_1 = require("../components/useTable");
var employeeService = require("../services/employeeService");
var Controls_1 = require("../components/controls/Controls");
var Popup_1 = require("../components/controls/Popup");
var Notification_1 = require("../components/Notification");
var ConfirmDialog_1 = require("../components/ConfirmDialog");
var PageHeader_1 = require("../components/PageHeader/PageHeader");
var useStyles = core_1.makeStyles(function (theme) { return ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: "75%"
    },
    newButton: {
        position: "absolute",
        right: "10px"
    }
}); });
var headCells = [
    { id: "fullName", label: "Employee Name" },
    { id: "email", label: "Email Address (Personal)" },
    { id: "mobile", label: "Mobile Number" },
    { id: "department", label: "Department" },
    { id: "actions", label: "Actions", disableSorting: true },
];
var Words = function () {
    var classes = useStyles();
    var _a = react_1.useState(null), recordForEdit = _a[0], setRecordForEdit = _a[1];
    var _b = react_1.useState(employeeService.getAllEmployees()), records = _b[0], setRecords = _b[1];
    var _c = react_1.useState({ fn: function (items) { return items; } }), filterFn = _c[0], setFilterFn = _c[1];
    var _d = react_1.useState(false), openPopup = _d[0], setOpenPopup = _d[1];
    var _e = react_1.useState({ isOpen: false, message: "", type: "" }), notify = _e[0], setNotify = _e[1];
    var _f = react_1.useState({ isOpen: false, title: "", subtitle: "" }), confirmDialog = _f[0], setConfirmDialog = _f[1];
    var _g = useTable_1["default"](records, headCells, filterFn), TblContainer = _g.TblContainer, TblHead = _g.TblHead, TblPagination = _g.TblPagination, recordsAfterPagingAndSorting = _g.recordsAfterPagingAndSorting;
    var handleSearch = function (e) {
        var target = e.target;
        setFilterFn({
            fn: function (items) {
                if (target.value === "")
                    return items;
                else
                    return items.filter(function (item) {
                        return item.fullName.toLowerCase().includes(target.value);
                    });
            }
        });
    };
    var addOrEdit = function (employee, resetForm) {
        if (employee.id === 0) {
            employeeService.insertEmployee(employee);
        }
        else {
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
    var openIpPopup = function (item) {
        setRecordForEdit(item);
        setOpenPopup(true);
    };
    var onDelete = function (id) {
        setConfirmDialog(__assign(__assign({}, confirmDialog), { isOpen: false }));
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: "Deleted Successfully",
            type: "success"
        });
    };
    return (<>
			<PageHeader_1["default"] title="New Employee" subtitle="Form design with validation" icon={<icons_1.PeopleOutlineTwoTone />}/>
			<core_1.Paper className={classes.pageContent}>
				<core_1.Toolbar>
					<Controls_1.Controls.Input label="Search Employees" className={classes.searchInput} InputProps={{
        startAdornment: (<core_1.InputAdornment position="start">
									<icons_1.Search />
								</core_1.InputAdornment>)
    }} onChange={handleSearch}/>
					<Controls_1.Controls.Button text="Add New" variant="outlined" startIcon={<icons_1.Add />} className={classes.newButton} onClick={function () { return setOpenPopup(true); }}/>
				</core_1.Toolbar>
				<TblContainer>
					<TblHead />
					<core_1.TableBody>
						{recordsAfterPagingAndSorting().map(function (item) {
        return (<core_1.TableRow key={item.id}>
									<core_1.TableCell>{item.fullName}</core_1.TableCell>
									<core_1.TableCell>{item.email}</core_1.TableCell>
									<core_1.TableCell>{item.mobile}</core_1.TableCell>
									<core_1.TableCell>{item.department}</core_1.TableCell>
									<core_1.TableCell>
										<Controls_1.Controls.ActionButton color="primary">
											<icons_1.EditOutlined fontSize="sm" onClick={function () { return openIpPopup(item); }}/>
										</Controls_1.Controls.ActionButton>
										<Controls_1.Controls.ActionButton color="secondary" onClick={function () { return setConfirmDialog({
            isOpen: true,
            title: "Are you sure to delete this record?",
            subtitle: "You can't undo this operation",
            onConfirm: function () { return onDelete(item.id); }
        }); }}>
											<icons_1.Close fontSize="sm"/>
										</Controls_1.Controls.ActionButton>
									</core_1.TableCell>
								</core_1.TableRow>);
    })}
					</core_1.TableBody>
				</TblContainer>
				<TblPagination />
			</core_1.Paper>
			<Popup_1["default"] title="Employee Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
				<WordsForm_1["default"] recordForEdit={recordForEdit} addOrEdit={addOrEdit}/>
			</Popup_1["default"]>
			<Notification_1["default"] notify={notify} setNotify={setNotify}/>
			<ConfirmDialog_1["default"] confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
		</>);
};
exports["default"] = Words;
