// app/lessons/page.tsx
import {LessonsPage} from "@/components/LessonsPage";

export default async function LessonsRoute() {


  // now we fetch data from the backend and parse it 

  const res= await fetch('http://localhost:3000/api/lessons',{
    next:{revalidate:60} //cache 60 seconds
  })

  // all lessons as json
  const data=await res.json();

  console.log(data, 'LESSONS')

  // now sending lessons to the component on the UI
  // were sending LessonsPage({ lessons: data });
  // so an object 
  return <LessonsPage lessonsZZ={data} />;
}
