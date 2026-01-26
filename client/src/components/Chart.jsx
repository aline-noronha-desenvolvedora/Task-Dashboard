import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
);

export default function Chart({ type, tasks = [] }) {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        layout: {
            padding: { top: 5, bottom: 30, left: 10, right: 10 },
        },
        plugins: {
            legend: {
                position: "top",
                labels: { font: { size: 10 }, padding: 6 },
            },
            title: { display: false },
        },
    };

    if (type === "status") {
        const data = {
            labels: ["Completed", "In Progress", "Pending"],
            datasets: [
                {
                    data: [
                        tasks.filter(t => t.status === "completed").length,
                        tasks.filter(t => t.status === "in_progress").length,
                        tasks.filter(t => t.status === "pending").length,
                    ],
                    backgroundColor: ["#22c55e", "#3b82f6", "#facc15"],
                },
            ],
        };

        return (
            <div className="h-full flex items-center justify-center">
                <Pie data={data} options={commonOptions} />
            </div>
        );
    }

    if (type === "category") {
        const categories = {};
        tasks.forEach(t => {
            const cat = t.category || "No category";
            categories[cat] = (categories[cat] || 0) + 1;
        });

        const data = {
            labels: Object.keys(categories),
            datasets: [
                {
                    data: Object.values(categories),
                    backgroundColor: "#3b82f6",
                },
            ],
        };

        const options = {
            ...commonOptions,
            plugins: { ...commonOptions.plugins, legend: { display: false } },
            scales: {
                x: { title: { display: true, text: "Category", font: { size: 10 } } },
                y: { title: { display: true, text: "Tasks", font: { size: 10 } }, beginAtZero: true },
            },
        };

        return (
            <div className="h-full flex items-center justify-center">
                <Bar data={data} options={options} />
            </div>
        );
    }

    if (type === "progressOverTime") {
        const mapByDate = {};

        tasks.forEach(t => {
            let rawDate;
            if (t.status === "completed") {
                rawDate = t.completedAt || t.createdAt;
            } else {
                rawDate = t.createdAt;
            }

            const date = rawDate ? new Date(rawDate).toISOString().slice(0, 10) : null;
            if (!date) return;

            if (!mapByDate[date]) {
                mapByDate[date] = { completed: 0, inProgress: 0, pending: 0 };
            }

            if (t.status === "completed") {
                mapByDate[date].completed += 1;
            } else if (t.status === "in_progress") {
                mapByDate[date].inProgress += 1;
            } else if (t.status === "pending") {
                mapByDate[date].pending += 1;
            }
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

    return null;
}
