export default class Task {
    constructor({ id, title, description, completed, userId, createdAt, updatedAt }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed ?? false;
        this.userId = userId;
        this.createdAt = createdAt;
    }
}
