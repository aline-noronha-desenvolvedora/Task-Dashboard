import { Line } from "react-chartjs-2";
import { commonOptions } from "./chartSetup";

export default function ProgressOverTimeChart({ tasks = [] }) {
    const mapByDate = {};

    tasks.forEach(t => {
        let rawDate = t.status === "completed" ? t.completedAt || t.createdAt : t.createdAt;
        const date = rawDate ? new Date(rawDate).toISOString().slice(0, 10) : null;
        if (!date) return;

        if (!mapByDate[date]) {
            mapByDate[date] = { completed: 0, inProgress: 0, pending: 0 };
        }

        if (t.status === "completed") mapByDate[date].completed += 1;
        else if (t.status === "in_progress") mapByDate[date].inProgress += 1;
        else if (t.status === "pending") mapByDate[date].pending += 1;
    });

    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        labels.push(d.toLocaleDateString("en-US", { weekday: "short" }));
    }

    const data = {
        labels,
        datasets: [
            {
                label: "Completed",
                data: labels.map((_, idx) => {
                    const d = new Date(today);
                    d.setDate(today.getDate() - (6 - idx));
                    const key = d.toISOString().slice(0, 10);
                    return mapByDate[key]?.completed || 0;
                }),
                borderColor: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.3)",
                tension: 0.3,
            },
            {
                label: "In Progress",
                data: labels.map((_, idx) => {
                    const d = new Date(today);
                    d.setDate(today.getDate() - (6 - idx));
                    const key = d.toISOString().slice(0, 10);
                    return mapByDate[key]?.inProgress || 0;
                }),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                tension: 0.3,
            },
            {
                label: "Pending",
                data: labels.map((_, idx) => {
                    const d = new Date(today);
                    d.setDate(today.getDate() - (6 - idx));
                    const key = d.toISOString().slice(0, 10);
                    return mapByDate[key]?.pending || 0;
                }),
                borderColor: "#facc15",
                backgroundColor: "rgba(250, 204, 21, 0.3)",
                tension: 0.3,
            },
        ],
    };

    const options = {
        ...commonOptions,
        scales: {
            x: { title: { display: true, text: "Day of Week", font: { size: 10 } } },
            y: { title: { display: true, text: "Tasks", font: { size: 10 } }, beginAtZero: true },
        },
    };

    return (
        <div className="h-full flex items-center justify-center">
            <Line data={data} options={options} />
        </div>
    );
}
