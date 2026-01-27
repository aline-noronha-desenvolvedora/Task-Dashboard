import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import useTasks from "../hooks/useTasks";

import StatusChart from "../components/charts/StatusChart";
import CategoryChart from "../components/charts/CategoryChart";
import ProgressOverTimeChart from "../components/charts/ProgressOverTimeChart";

export default function Dashboard() {
    const [filters, setFilters] = useState({
        status: "all",
        category: "",
        date: "",
        orderBy: "createdAt",
    });

    const { tasks, reloadTasks, loading } = useTasks(filters);

    const handleApplyFilters = (newFilters) => {
        setFilters({ ...newFilters });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-400 via-gray-200 to-gray-800 p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Task Dashboard</h1>
                <p className="text-gray-600">Manage your tasks and track progress</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-4">
                        <TaskForm onTaskCreated={reloadTasks} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-4">
                        {loading ? (
                            <p className="text-gray-500">Loading tasks...</p>
                        ) : (
                            <TaskList tasks={tasks} />
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-2">Filters</h2>
                        <Filters onApply={handleApplyFilters} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-4 h-96">
                        <h2 className="text-lg font-semibold mb-2">Tasks Status</h2>
                        <StatusChart tasks={tasks} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-4 h-96">
                        <h2 className="text-lg font-semibold mb-2">Tasks by Category</h2>
                        <CategoryChart tasks={tasks} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-4 h-96">
                        <h2 className="text-lg font-semibold mb-2">Tasks Progress Over Last 7 Days</h2>
                        <ProgressOverTimeChart tasks={tasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
