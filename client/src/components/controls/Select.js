import React from "react";
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
} from "@material-ui/core";

const Select = (props) => {
	const { name, label, value, onChange, options, error = null } = props;

	return (
		<FormControl
			variant="outlined"
			{...(error && {error: true})}
		>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				row={true}
				label={label}
				name={name}
				value={value}
				onChange={onChange}
			>
				<MenuItem value="None">None</MenuItem>
				{options.map((option) => (
					<MenuItem key={option.id} value={option.id}>
						{option.title}
					</MenuItem>
				))}
			</MuiSelect>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	);
};

export default Select;
