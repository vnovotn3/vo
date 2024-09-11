"use client";

import { Editor as TinyMCE } from "@tinymce/tinymce-react";

export default function Editor({ height, ...props }) {
	return (
		<TinyMCE
			apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
			init={{
				height: height ?? 400,
				menubar: false,
				plugins: [
					"advlist",
					"autolink",
					"lists",
					"link",
					"image",
					"charmap",
					"preview",
					"anchor",
					"searchreplace",
					"visualblocks",
					"fullscreen",
					"insertdatetime",
					"media",
					"table",
					"code",
					"help",
					"wordcount",
					"hr",
				],
				toolbar:
					"undo redo | blocks | " +
					"bold italic forecolor alignleft aligncenter " +
					"alignright alignjustify link code media | bullist numlist outdent indent hr | " +
					"removeformat | help",
				content_style:
					"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
			}}
			{...props}
		/>
	);
}
