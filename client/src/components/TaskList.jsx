export default function TaskList({ tasks, page, setPage, totalPages }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="mt-6 bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Task List</h2>
                <p className="text-gray-500">No tasks found.</p>
            </div>
        );
    }

    return (
        <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Task List</h2>
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li key={task.id} className="border p-2 rounded">
                        <p className="font-bold">{task.title}</p>
                        {task.description && <p>{task.description}</p>}
                        <p>Status: {task.status}</p>
                        {task.category && <p>Category: {task.category}</p>}
                        {task.completedAt && (
                            <p>
                                Completed at:{" "}
                                {new Date(task.completedAt).toLocaleDateString()}
                            </p>
                        )}
                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span>
          Page {page} of {totalPages}
        </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
