import { TeacherPage } from "@/components/teacherPage";

type LessonPageProps = {
	params: { id: string };
};

export default async function LessonPage({ params }: LessonPageProps) {
	// importing data from server

	// qr code
	const data = await fetch("http://localhost:3000/api/qr?text=HelloNextJS", {
		cache: "no-store",
	});

	
	const intoJson = await data.json();
	
	// here id taken from url in future
	const id = String(params?.id);

	// fetching data about one lesson

	const lessonData = await fetch(`http://localhost:3000/api/lessons/${id}`);

	// console.log("status", lessonData.status);
	// console.log("text", await lessonData.text());

	const lessonInfo = await lessonData.json();
	// if there is no such lesson
	if (!lessonData.ok) {
		return (
			<div className="p-6 mx-auto">
				<h1 className="text-xl text-red-600">Lesson not found</h1>
			</div>
		);
	}

	return (
		<>
			<div className="p-6 flex flex-col justify-center items-center">
				<h1 className="text-2xl font-bold">Lesson: {lessonInfo.name}</h1>
				<p>{lessonInfo.classes}</p>
				<p>{lessonInfo.time} hours</p>
			</div>

			{/* later after the bar with info */}
			<div className="p-6 flex flex-1 flex-col justify-center items-center">
				{/* <TeacherPage src={intoJson}></TeacherPage> */}
			</div>
		</>
	);
}
