export const generateRandomCode = () => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Pool of alphanumeric characters
	let code = "IS";

	// Generate the first part "ISX"
	const randomIndex = Math.floor(Math.random() * characters.length);
	code += characters[randomIndex];

	code += "_"; // Add the underscore separator

	// Generate the second part "XXX"
	for (let i = 0; i < 3; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		code += characters[randomIndex];
	}

	return code;
};
