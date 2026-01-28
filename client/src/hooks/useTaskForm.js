import { useState } from "react";
import taskService from "../services/taskService";

export default function useTaskForm(onTaskCreated) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [category, setCategory] = useState("");
    const [completedAt, setCompletedAt] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("The title is need");
            return;
        }

        try {
            const now = new Date();

            const payload = {
                title: title.trim(),
                description: description.trim() || null,
                status: status,
                category: category.trim() || null,
                createdAt: now.toISOString(),
            };

            if (status === "completed") {
                payload.completedAt = completedAt
                    ? new Date(completedAt).toISOString()
                    : now.toISOString();
            } else {
                payload.completedAt = null;
            }
            
            await taskService.createTask(payload);

            setTitle("");
            setDescription("");
            setStatus("pending");
            setCategory("");
            setCompletedAt("");

            if (onTaskCreated) onTaskCreated();

        } catch (err) {
            const serverError = err.response?.data?.error || err.response?.data || "";
        }
    };

    return {
        title, setTitle,
        description, setDescription,
        status, setStatus,
        category, setCategory,
        completedAt, setCompletedAt,
        handleSubmit,
    };
}