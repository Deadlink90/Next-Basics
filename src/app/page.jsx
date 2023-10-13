import TaskCard from "@/components/TaskCard";

const obtainTasks = async () => {
  const res = await fetch("http://localhost:3000/api/tasks",{
    method:"GET"
  });
  const data = await res.json();
  return data;
};

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const tasks = await obtainTasks();
  return (
    <section className="container mx-auto">
    <div className="grid grid-cols-3 gap-3 mt-10">
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id}/>
      ))}
    </div>
    </section>
  );
};

export default HomePage;
