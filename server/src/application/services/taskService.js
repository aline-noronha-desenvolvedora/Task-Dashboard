import taskRepository from "../../infrastructure/repositories/taskRepository.js";
import Task from "../../domain/entities/Task.js";

async function createTask(data, userId) {
    const taskData = { ...data, userId };
    const task = await taskRepository.create(taskData);
    return new Task(task);
}

async function getTaskById(id, userId) {
    const task = await taskRepository.findById(id, userId);
    return task ? new Task(task) : null;
}

async function getTasks(filters, userId) {
    const tasks = await taskRepository.findByFilters({ ...filters, userId }, filters.orderBy || undefined);
    return tasks.map(t => new Task(t));
}

async function updateTask(id, data, userId) {
    const task = await taskRepository.update(id, data, userId);
    return new Task(task);
}

async function deleteTask(id, userId) {
    return await taskRepository.remove(id, userId);
}

export default { createTask, getTaskById, getTasks, updateTask, deleteTask };
