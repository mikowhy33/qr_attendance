type LessonPageProps = {
  params: { id: string };
};

export default async function LessonPage({ params }: LessonPageProps) {
  // params.id pochodzi z URL-a, np. "/lessons/3"
  const {id} = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Lesson {id}</h1>
      <p>Here you can render details for lesson #{id}</p>
    </div>
  );
}
