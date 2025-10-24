import { lessonsTypes } from "@/types/lessonsTypes";
import { NextResponse } from "next/server";

// this will be fetched from the server in fiture
const lessons = [
	{
		id: 1,
		name: "Python",
		classes: "Grade 6",
		time: 2,
	},
	{
		id: 2,
		name: "JavaScript",
		classes: "Grade 4",
		time: 4,
	},
	{
		id: 3,
		name: "Ruby",
		classes: "Grade 1",
		time: 7,
	},
	{
		id: 4,
		name: "PHP",
		classes: "Grade 7",
		time: 1,
	},
];

// we want to get one lesson based on the params
export async function GET(
	// we are not using request but it has to be in a GET
	_request: Request,
	// here a param is inside a string which is id of the lesson
	{ params }: { params: { id: string } }
) {
	const id = Number(params.id);
	const lesson = lessons.find((l) => l.id === id);

	if (!lesson) {
		return NextResponse.json(
			{ success: false, message: "Lesson not found" },
			{ status: 404 }
		);
	}

	return NextResponse.json(lesson);
}
