export function validateTaskCreate({ title, status, completedAt }) {
    if (!title || title.trim() === "") {
        return "Title is required";
    }

    const validStatuses = ["pending", "in_progress", "completed"];
    if (!validStatuses.includes(status)) {
        return "Invalid status";
    }

    if (status !== "completed" && completedAt) {
        return "completedAt can only be set if status = completed";
    }

    return null;
}

export function validateTaskUpdate({ status, completedAt }) {
    const validStatuses = ["pending", "in_progress", "completed"];
    if (status && !validStatuses.includes(status)) {
        return "Invalid status";
    }

    if (status !== "completed" && completedAt) {
        return "completedAt can only be set if status = completed";
    }

    return null;
}
