import authService from "../../application/services/authService.js";

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email and password are required" });
        }

        const user = await authService.register({ name, email, password });
        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const token = await authService.login({ email, password });
        return res.json({ token });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}
