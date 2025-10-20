import Image from "next/image";

import { TeacherPage } from "@/components/teacherPage";
import { useEffect, useState } from "react";

export default async function Home() {
	const data = await fetch("http://localhost:3000/api/qr?text=HelloNextJS", {cache:"no-store"});

  
	const intoJson = await data.json();


	console.log(intoJson);

	return (
		<>
			{/* sending an obj, our qr code */}
			<TeacherPage src={intoJson}></TeacherPage>
			<div className="bg-cyan-400">Bzz</div>
		</>
	);
}

/*
const [qrCode, setQrCode] = useState<string | null>(null);

	useEffect(() => {
		// download code from backed
		fetch("/api/qr?text=HelloNextJS")
			// into json
			.then((res) => res.json())
			// stored in hook
			.then((data) => setQrCode(data.qr));
	}, []);

	return (
		<>
			

			{qrCode ? (
				<div>
					<img src={qrCode}></img>
				</div>
			) : (
				<p>Generating..</p>
			)}

			<TeacherPage ></TeacherPage>
			<div className="bg-cyan-400">Bzz</div>
		</>
*/
