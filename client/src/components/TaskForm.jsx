import { useState } from "react";
import api from "../services/api";

export default function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [category, setCategory] = useState("");
    const [completedAt, setCompletedAt] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/tasks", {
                title,
                description,
                status,
                category,
                completedAt: status === "completed" && completedAt ? completedAt : null,
            });

            alert("Task created!");

            setTitle("");
            setDescription("");
            setStatus("pending");
            setCategory("");
            setCompletedAt("");

            if (onTaskCreated) {
                onTaskCreated(res.data);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Error creating task");
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full px-3 py-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    className="w-full px-3 py-2 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="w-full px-3 py-2 border rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <input
                    type="text"
                    placeholder="Category"
                    className="w-full px-3 py-2 border rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                {status === "completed" && (
                    <input
                        type="date"
                        className="w-full px-3 py-2 border rounded"
                        value={completedAt}
                        onChange={(e) => setCompletedAt(e.target.value)}
                    />
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </form>
        </div>
    );
}
