import { useState } from "react";

export default function Filters({ onApply }) {
    const [localFilters, setLocalFilters] = useState({
        status: "all",
        category: "",
        date: "",
        orderBy: "createdAt",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-4">
            <select name="status" value={localFilters.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <input type="text" name="category" placeholder="Category" value={localFilters.category} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

            <input type="date" name="date" value={localFilters.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

            <select name="orderBy" value={localFilters.orderBy} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="createdAt">Creation date</option>
                <option value="status">Status</option>
            </select>

            <button onClick={() => onApply(localFilters)} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Apply filters
            </button>
        </div>
    );
}
