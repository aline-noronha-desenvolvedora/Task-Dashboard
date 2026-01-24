export default function Filters({ onFilterChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <select
                name="status"
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
            >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <input
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
            />

            <input
                type="date"
                name="date"
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
            />

            <select
                name="orderBy"
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
            >
                <option value="createdAt">Creation Date</option>
                <option value="status">Status</option>
            </select>
        </div>
    );
}
