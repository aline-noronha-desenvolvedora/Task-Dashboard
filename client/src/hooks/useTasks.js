import { useState, useEffect } from "react";
import taskService from "../services/taskService";

export default function useTasks(filters = {}, page = 1, limit = 10) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await taskService.getTasks(filters, page, limit);

            setTasks(data.tasks || []);
            setTotal(data.total || 0);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            console.error("Error loading tasks:", err);
            setTasks([]);
            setTotal(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [JSON.stringify(filters), page, limit]);

    return {
        tasks,
        loading,
        total,
        totalPages,
        reloadTasks: loadTasks
    };
}
