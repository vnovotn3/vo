"use client";

import { useCallback, useState } from "react";
import { capitalizeFirstLetter } from "../utils/convertors";

export default function Select({ options, selected, onChange, ...props }) {
	const [selectedOption, setSelectedOption] = useState(selected);

	const handleChange = useCallback(
		(event) => {
			setSelectedOption(event.target.value);
			onChange(event.target.value);
		},
		[onChange]
	);

	return (
		<select
			value={selectedOption}
			onChange={handleChange}
			className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-0 ring-1 ring-inset ring-gray-300"
			{...props}
		>
			{options.map((o, index) => (
				<option key={`o-${index}`} value={o}>
					{capitalizeFirstLetter(o)}
				</option>
			))}
		</select>
	);
}
