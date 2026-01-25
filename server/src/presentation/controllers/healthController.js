export function healthCheck(req, res) {
    res.json({ status: "ok", message: "Server is healthy 🚀" });
}

export default { healthCheck };
