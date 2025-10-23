import { Card } from "./ui/card";

import Link from "next/link";

// simulating data from database

type lessonsTypes={
    id:number,
    name:string,
    classes:string,
    time:number
}

const lessons:lessonsTypes[]=[

    {
        id:1,
        name:"Python",
        classes:"Grade 6",
        time:2
    },
    {
        id:2,
        name:"JavaScript",
        classes:'Grade 4',
        time:4
    },
    {
        id:3,
        name:"Ruby",
        classes:'Grade 1',
        time:7
    },
    {
        id:4,
        name:"PHP",
        classes:'Grade 7',
        time:1
    }
]

export const LessonsPage = () => {
	return (
		<>
			<div className="flex flex-wrap justify-center gap-8 p-4 ">

            
                {lessons.map(lesson=>(
                    // asChild allows to take all styles and formats from Card but behaves as a link, whole card is clickable not only the link
                 <Card asChild  className="w-full max-w-sm flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300" key={lesson.id} >
                    <Link href={`/lessons/${lesson.id}`}>
                     <h2 className="text-xl font-semibold">{lesson.name}</h2>
                     <p className="">{lesson.classes}</p>
                     <p className="">{lesson.time} hours</p>
                     </Link>
                 </Card>   
                ))}
				 
				
			</div>
		</>
	);
};
