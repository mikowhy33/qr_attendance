import { TeacherPage } from "@/components/TeacherPage";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { studTypes } from "@/types/lessonsTypes";

type LessonPageProps = {
	params: { id: string };
};

// PARAMS TAKEN FROM THE URL!
// IT IS BCS WE ARE IN A DYNAMIC ROUTE AND PARAMS ARE GIVEN BY DEFAULT!
// THAT IS WHY WE HAVE A ID BY DEFAULT!
export default async function LessonPage({ params }: LessonPageProps) {
	console.log(params, "PARAMS");
	console.log("params typeof ===>", typeof params);

	// below fetching from qr code and the lesson we clicked
	const data = await fetch("http://localhost:3000/api/qr?text=HelloNextJS", {
		cache: "no-store",
	});

	const intoJson = await data.json();

	const id = String(params?.id);

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

	const res = await fetch("http://localhost:3000/api/students");
	console.log(res, "RAW DATA");
	const studentsData = await res.json();
	console.log(studentsData, "JAJAJAJAJAJJAKOKOIDZAMOBOO");

	return (
		<>
			<div className=" flex flex-col justify-center items-center">
				<h1 className="text-2xl font-bold">Lesson: {lessonInfo.name}</h1>
				<p>{lessonInfo.classes}</p>
				<p>{lessonInfo.time} hours</p>

				<Table className="max-w-6xl mx-auto">
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Surname</TableHead>
							<TableHead className="text-right">Time arrived</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{studentsData.map((stud: studTypes) => (
							<TableRow key={stud.id}>
								<TableCell className="font-medium">{stud.id}</TableCell>
								<TableCell>{stud.name}</TableCell>
								<TableCell>{stud.surname}</TableCell>
								<TableCell className="text-right">{stud.time}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{/* later after the bar with info */}
				<div className="pt-6 flex flex-1 flex-col justify-center items-center mb-12">
					<TeacherPage src={intoJson}></TeacherPage>
				</div>
			</div>
		</>
	);
}
