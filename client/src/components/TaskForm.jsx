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
                completedAt:
                    status === "completed" && completedAt ? completedAt : null,
            });

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                New Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-lime-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-3">
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                {status === "completed" && (
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                        value={completedAt}
                        onChange={(e) => setCompletedAt(e.target.value)}
                    />
                )}

                <button
                    type="submit"
                    className="
                        w-full
                        bg-lime-500
                        text-white
                        py-2
                        rounded-md
                        font-medium
                        hover:bg-lime-600
                        transition
                        focus:outline-none
                        focus:ring-2
                        focus:ring-lime-400
                    "
                >
                    Add Task
                </button>
            </form>
        </div>
    );
}
