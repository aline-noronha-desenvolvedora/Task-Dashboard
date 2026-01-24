import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import Chart from "../components/Chart";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TaskForm />
                <Filters />
            </div>
            <TaskList />
            <Chart />
        </div>
    );
}
