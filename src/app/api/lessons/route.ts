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


export async function GET(){
    // we are returning all the lessons
    return NextResponse.json(lessons);
}
