export const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

export const formatDate = (date) => {
	return new Intl.DateTimeFormat("en-GB").format(date).replaceAll("/", "-");
};

export const parseDate = (date) => {
	const [day, month, year] = date.split("-").map(Number);
	return new Date(year, month - 1, day);
};

export const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
