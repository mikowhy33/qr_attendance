import { studTypes } from "@/types/lessonsTypes";
import { NextResponse } from "next/server";


const studentsData: studTypes[] = [
	{
		id: 1,
		name: "John",
		surname: "Doe",
		time: "14:04",
	},
	{
		id: 2,
		name: "Xi",
		surname: "JinPing",
		time: "14:06",
	},
	{
		id: 3,
		name: "Donald",
		surname: "Trump",
		time: "14:02",
	},
	{
		id: 4,
		name: "Joe",
		surname: "Mama",
		time: "14:11",
	},
];

// in future here from a database
export async function GET() {

    return NextResponse.json(studentsData);
}
