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
        order: "asc" 
    });

    const fetchTasks = async () => {
        try {
            const params = {};

            if (filters.status && filters.status !== "all") {
                params.status = filters.status;
            }

            if (filters.order) {
                params.orderBy = filters.order; 
            }

            const res = await api.get("/tasks", { params });

            const normalized = res.data.map((t) => ({
                ...t,
                status: t.status?.toLowerCase()
            }));

            setTasks(normalized);
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
                <TaskForm onTaskCreated={fetchTasks} />
            </div>
            
            <TaskList tasks={tasks} />

            <Filters onFilterChange={setFilters} />

            <Chart tasks={tasks} />
        </div>
    );
}
