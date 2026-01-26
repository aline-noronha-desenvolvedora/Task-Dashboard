import { useState, useEffect } from "react";
import taskService from "../services/taskService";

export default function useTasks(filters = {}) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await taskService.getTasks();
            const allTasks = Array.isArray(data) ? data : [];

            const filtered = allTasks.filter(task => {
                const statusMatch = !filters.status || filters.status === "all" || task.status === filters.status;
                const categoryMatch = !filters.category || task.category.includes(filters.category);
                const dateMatch =
                    !filters.date ||
                    new Date(task.createdAt).toISOString().slice(0, 10) === filters.date;
                return statusMatch && categoryMatch && dateMatch;
            });

            setTasks(filtered);
        } catch (err) {
            console.error("Error loading tasks:", err);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [JSON.stringify(filters)]);

    return { tasks, loading, reloadTasks: loadTasks };
}
