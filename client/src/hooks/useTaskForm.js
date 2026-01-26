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
        try {
            await taskService.createTask({
                title,
                description,
                status,
                category,
                completedAt: status === "completed" ? completedAt : null,
            });
            setTitle("");
            setDescription("");
            setStatus("pending");
            setCategory("");
            setCompletedAt("");
            if (onTaskCreated) onTaskCreated();
        } catch (err) {
            console.error("Error creating task:", err);
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
