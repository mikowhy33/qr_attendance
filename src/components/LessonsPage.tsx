import { Card } from "./ui/card";

import Link from "next/link";

// simulating data from database

import {lessonsTypes} from '../types/lessonsTypes'

// props is an obj that has a field lessons1 which is of type lessonsTypes[]
export const LessonsPage = (props:{lessonsZZ:lessonsTypes[]}) => {
	return (
		<>
			<div className="flex flex-wrap justify-center gap-8 p-4 ">

            
                {props.lessonsZZ.map(lesson=>(
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
