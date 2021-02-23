import React from "react";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup as MuiRadioGroup
} from "@material-ui/core";

const RadioGroup = (props) => {
	const { name, label, value, onChange, items } = props;

	return (
		<FormControl>
			<FormLabel>Gender</FormLabel>
			<MuiRadioGroup
				row="true"
				name={name}
				value={value}
				label={label}
				onChange={onChange}
			>
				{items.map((item) => (
					<FormControlLabel
						key={item.id}
						value={item.id}
						control={<Radio />}
						label={item.title}
					></FormControlLabel>
				))}
			</MuiRadioGroup>
		</FormControl>
	);
};

export default RadioGroup;
