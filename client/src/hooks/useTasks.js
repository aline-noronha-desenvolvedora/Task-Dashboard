import { useState, useEffect } from "react";
import taskService from "../services/taskService";

export default function useTasks(filters = {}) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const sanitizedFilters = { ...filters };
            Object.keys(sanitizedFilters).forEach(
                (key) => sanitizedFilters[key] === "" && delete sanitizedFilters[key]
            );
            if (sanitizedFilters.status === "all") delete sanitizedFilters.status;

            const data = await taskService.getTasks(sanitizedFilters);
            setTasks(Array.isArray(data) ? data : []);
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
