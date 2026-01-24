export default function TaskList({ tasks }) {
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
                            <p>Completed at: {new Date(task.completedAt).toLocaleDateString()}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
