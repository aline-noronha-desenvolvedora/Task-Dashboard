import { useState, useEffect, useMemo } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import Chart from "../components/Chart";
import api from "../services/api";

export default function Dashboard() {
    const [allTasks, setAllTasks] = useState([]);
    const [filters, setFilters] = useState({
        status: "all",
        category: "",
        date: "",
        orderBy: "createdAt",
    });

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");

            const normalized = res.data.map((t) => ({
                ...t,
                status: t.status?.toLowerCase(),
            }));

            setAllTasks(normalized);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = useMemo(() => {
        let result = [...allTasks];

        if (filters.status !== "all") {
            result = result.filter((t) => t.status === filters.status);
        }

        if (filters.category) {
            result = result.filter((t) =>
                t.category?.toLowerCase().includes(filters.category.toLowerCase())
            );
        }

        if (filters.date) {
            result = result.filter(
                (t) =>
                    t.completedAt &&
                    t.completedAt.startsWith(filters.date)
            );
        }

        if (filters.orderBy === "status") {
            result.sort((a, b) => a.status.localeCompare(b.status));
        } else {
            result.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        }

        return result;
    }, [allTasks, filters]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-400 via-gray-200 to-gray-800 p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Task Dashboard
                </h1>
                <p className="text-gray-600">
                    Manage your tasks and track progress
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <TaskForm onTaskCreated={fetchTasks} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <TaskList tasks={filteredTasks} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Filters
                        </h2>
                        <Filters onApply={setFilters} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 h-80">
                        <Chart tasks={filteredTasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
