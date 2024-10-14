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

export const transformHTML = (node) => {
	if (node.type === "tag") {
		switch (node.name) {
			case "h1":
				node.attribs.class = "text-2xl font-bold mb-4"; // Tailwind classes for <h1>
				break;
			case "h2":
				node.attribs.class = "text-xl font-semibold my-4";
				break;
			case "h3":
				node.attribs.class = "text-lg font-semibold my-4"; // Tailwind classes for <h2>
				break;
			case "h4":
				node.attribs.class = "text-base font-semibold my-4"; // Tailwind classes for <h2>
				break;
			case "p":
				node.attribs.class = "text-base text-gray-700 mb-3 inline-block w-full"; // Tailwind classes for <p>
				break;
			case "li":
				node.attribs.class = "text-base text-gray-600 last:mb-4"; // Style list items
				break;
			case "ul":
				node.attribs.class = "list-disc ml-6"; // Unordered list with bullets
				break;
			case "ol":
				node.attribs.class = "list-decimal ml-6"; // Ordered list with numbers
				break;
			case "hr":
				node.attribs.class = "mb-12"; // Tailwind class for unordered list
				break;
			case "a":
				node.attribs.class =
					"text-blue-600 underline hover:text-blue-800 transition-colors"; // Styling <a> tags
				break;
			case "iframe":
				return (
					<div className="relative overflow-hidden pb-[56.25%]">
						<iframe
							{...node.attribs}
							className="absolute top-0 left-0 w-full h-full"
						/>
					</div>
				);
			default:
				break;
		}
	}
};
