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
var useForm_1 = require("../components/useForm");
var Controls_1 = require("../components/controls/Controls");
var employeeService = require("../services/employeeService");
var initialValues = {
    id: 0,
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    gender: "male",
    departmentId: "",
    hireDate: new Date(),
    isPermanent: false
};
var genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
];
var WordsForm = function (props) {
    var addOrEdit = props.addOrEdit, recordForEdit = props.recordForEdit;
    var validate = function (fieldValues) {
        if (fieldValues === void 0) { fieldValues = values; }
        var temp = __assign({}, errors);
        if ("fullName" in fieldValues) {
            temp.fullName = fieldValues.fullName ? "" : "This field is required";
        }
        if ("email" in fieldValues) {
            temp.email = /$^|.+@.+..+/.test(fieldValues.email)
                ? ""
                : "Email is not valid";
        }
        if ("mobile" in fieldValues) {
            temp.mobile =
                fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required";
        }
        if ("departmentId" in fieldValues) {
            temp.departmentId =
                fieldValues.departmentId.length !== 0 ? "" : "This field is required";
        }
        setErrors(__assign({}, temp));
        if (fieldValues === values) {
            return Object.values(temp).every(function (x) { return x === ""; });
        }
    };
    var _a = useForm_1.useForm(initialValues, true, validate), values = _a.values, setValues = _a.setValues, handleInputChange = _a.handleInputChange, errors = _a.errors, setErrors = _a.setErrors, resetForm = _a.resetForm;
    var handleSubmit = function (e) {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };
    react_1.useEffect(function () {
        if (recordForEdit != null) {
            setValues(__assign({}, recordForEdit));
        }
    }, [recordForEdit]);
    return (<useForm_1.Form onSubmit={handleSubmit}>
			<core_1.Grid container>
				<core_1.Grid item xs={6}>
					<Controls_1.Controls.Input label="Full Name" name="fullName" value={values.fullName} onChange={handleInputChange} error={errors.fullName}/>
					<Controls_1.Controls.Input label="Email" name="email" value={values.email} onChange={handleInputChange} error={errors.email}/>
					<Controls_1.Controls.Input label="Mobile" name="mobile" value={values.mobile} onChange={handleInputChange} error={errors.mobile}/>
					<Controls_1.Controls.Input label="City" name="city" value={values.city} onChange={handleInputChange}/>
				</core_1.Grid>
				<core_1.Grid item xs={6}>
					<Controls_1.Controls.RadioGroup name="gender" label="Gender" value={values.gender} onChange={handleInputChange} items={genderItems}/>
					<Controls_1.Controls.Select variant="outlined" name="departmentId" label="Department" value={values.departmentId} onChange={handleInputChange} options={employeeService.getDepartmentCollection()} error={errors.departmentId}/>
					<Controls_1.Controls.DatePicker name="hireDate" label="Hire Date" value={values.hireDate} onChange={handleInputChange}/>
					<Controls_1.Controls.Checkbox name="isPermanent" label="Permanent Employee" value={values.isPermanent} onChange={handleInputChange}/>
					<div>
						<Controls_1.Controls.Button type="submit" text="Submit"/>
						<Controls_1.Controls.Button color="default" text="Reset" onClick={resetForm}/>
					</div>
				</core_1.Grid>
			</core_1.Grid>
		</useForm_1.Form>);
};
exports["default"] = WordsForm;
