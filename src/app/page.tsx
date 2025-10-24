import Image from "next/image";

import { TeacherPage } from "@/components/teacherPage";
import { useEffect, useState } from "react";
import { LessonsPage } from "@/components/LessonsPage";

export default async function Home() {
	const data = await fetch("http://localhost:3000/api/qr?text=HelloNextJS", {
		cache: "no-store",
	});

	const intoJson = await data.json();

	// console.log(intoJson);

	return (
		<>
			{/*  h-full will not work since no parent has any height, flex-1 will work bcs its flexible and we are taking rest of the space */}
			<div className=" flex flex-col flex-1 items-center justify-center w-full  gap-3 p-5 ">
				<p className="mx-auto text-center">
					{" "}
					Welcome to the QR attendance app, please choose page from the menu
				</p>
			</div>

			{/* sending an obj, our qr code */}
			{/* <TeacherPage src={intoJson}></TeacherPage> */}
			{/* <LessonsPage></LessonsPage> */}
		</>
	);
}
