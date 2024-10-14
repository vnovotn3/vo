"use client";

export default function Button({
	type,
	onClick,
	isFullWidth,
	label,
	classes,
	isActive,
	icon,
	iconLeft,
}) {
	return (
		<button
			onClick={onClick}
			className={`${
				isFullWidth ? "w-full" : ""
			} flex flex-row justify-center content-center space-x-2 px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md ${
				type === "primary"
					? "text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
					: type === "white"
					? "text-indigo-600 bg-white hover:opacity-80"
					: type === "border"
					? "bg-white shadow-sm hover:bg-gray-100 text-gray-800 border border-gray-300 shadow"
					: type === "border-white"
					? "text-white hover:opacity-80 border border-white"
					: type === "simple"
					? `${
							isActive ? "bg-gray-100" : "bg-white"
					  } hover:bg-gray-100 text-gray-800`
					: ""
			} ${classes}`}
		>
			{iconLeft && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					style={{ marginTop: "2px" }}
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d={iconLeft === "back" ? "M15.75 19.5 8.25 12l7.5-7.5" : ""}
					/>
				</svg>
			)}
			<span style={{ paddingTop: "1px" }}>{label}</span>
			{icon && (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					style={{ marginTop: "2px" }}
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d={
							icon === "link"
								? "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
								: icon === "plus"
								? "M12 4.5v15m7.5-7.5h-15"
								: ""
						}
					/>
				</svg>
			)}
		</button>
	);
}
