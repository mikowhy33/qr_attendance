"use client";
import { useState } from "react";
import { Button } from "./ui/button";

type Data = {
	src: any;
};

export const TeacherPage = ({ src }: Data) => {
	// console.log(src.qr)

	const [data, setData] = useState(src);

	const handleGenerateNew = async () => {
		const res = await fetch("/api/qr", { cache: "no-cache" });
		const data = await res.json();
		setData(data);
	};

	return (
		<>
        {/* We are taking whole space from the body, also width is a screen */}
			<div className="flex flex-col flex-1 items-center w-screen  gap-3 p-5">
				<Button onClick={handleGenerateNew} className="max-w-2xs">
					{" "}
					Click to generate a QR code{" "}
				</Button>
				{src || data ? (
                    // we are taking the rest of free space and center it
					<div className="flex flex-1 w-full justify-center items-center">
						{/* gotta access obj qr code */}
                        {/* object-contain, scales the img, it will not be blurry, in smaller/ bigger screens the qr code always will look nice! */}
						<img src={data.qr} className="w-128 h-128  object-contain " ></img>
					</div>
				) : (
					<p>Generating..</p>
				)}
			</div>
		</>
	);
};
