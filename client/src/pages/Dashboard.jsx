import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import Chart from "../components/Chart";
import api from "../services/api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        status: "all",
        category: "all",
        date: null,
        orderBy: "createdAt",
        orderDirection: "asc" 
    });

    const fetchTasks = async () => {
        try {
            const params = {};
            if (filters.status && filters.status !== "all") {
                params.status = filters.status;
            }
            if (filters.category && filters.category !== "all") {
                params.category = filters.category;
            }
            if (filters.date) {
                params.date = filters.date;
            }
            if (filters.orderBy) {
                params.orderBy = filters.orderBy;
            }
            if (filters.orderDirection) {
                params.orderDirection = filters.orderDirection;
            }

            const res = await api.get("/tasks", { params });
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [filters]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TaskForm
                    onTaskCreated={(newTask) => setTasks((prev) => [...prev, newTask])}
                />
            </div>

            <TaskList tasks={tasks} />

            <Filters onFilterChange={setFilters} />

            <Chart tasks={tasks} />
        </div>
    );
}
