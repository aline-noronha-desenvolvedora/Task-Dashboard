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
    const { orderBy, orderDirection, ...rest } = filters; 
    return await taskRepository.findByFilters({ ...rest, userId }, orderBy, orderDirection); }

async function updateTask(id, data, userId) {
    const task = await taskRepository.update(id, data, userId);
    return new Task(task);
}

async function deleteTask(id, userId) {
    return await taskRepository.remove(id, userId);
}

export default { createTask, getTaskById, getTasks, updateTask, deleteTask };
