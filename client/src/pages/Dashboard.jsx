import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import Chart from "../components/Chart";
import useTasks from "../hooks/useTasks";

export default function Dashboard() {
    const [filters, setFilters] = useState({
        status: "all",
        category: "",
        date: "",
        orderBy: "createdAt",
    });

    const { tasks, reloadTasks, loading } = useTasks(filters);

    const handleApplyFilters = (newFilters) => {
        const sanitizedFilters = { ...newFilters };
        Object.keys(sanitizedFilters).forEach(
            (key) => sanitizedFilters[key] === "" && delete sanitizedFilters[key]
        );
        if (sanitizedFilters.status === "all") delete sanitizedFilters.status;
        setFilters({ ...sanitizedFilters });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-400 via-gray-200 to-gray-800 p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Task Dashboard</h1>
                <p className="text-gray-600">Manage your tasks and track progress</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <TaskForm onTaskCreated={reloadTasks} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        {loading ? (
                            <p className="text-gray-500">Loading tasks...</p>
                        ) : (
                            <TaskList tasks={tasks} />
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        <Filters onApply={handleApplyFilters} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 h-80">
                        <Chart tasks={tasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
