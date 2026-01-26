export function getTaskStatusCounts(tasks = []) {
    return {
        completed: tasks.filter(t => t.status === "completed").length,
        inProgress: tasks.filter(t => t.status === "in_progress").length,
        pending: tasks.filter(t => t.status === "pending").length,
    };
}
