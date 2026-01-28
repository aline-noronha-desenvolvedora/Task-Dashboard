export default class Task {
    constructor({ id, title, description, status, category, completedAt, createdAt, userId }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.category = category;
        this.completedAt = completedAt;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}
