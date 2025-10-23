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

			
			{/* sending an obj, our qr code */}
			<TeacherPage src={intoJson}></TeacherPage>
			<LessonsPage></LessonsPage>
		</>
	);
}
