"use client";

import { Snackbar } from "@mui/material";

export default function Snack({ message, open, setOpen }) {
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			autoHideDuration={4000}
			open={open}
			onClose={handleClose}
			message={message}
			sx={{
				"& .MuiSnackbarContent-root": {
					backgroundColor: "#092b52",
					color: "white",
					fontWeight: "500",
					borderRadius: "6px",
				},
			}}
		/>
	);
}
