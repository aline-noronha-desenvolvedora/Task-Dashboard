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
        return <Pie data={data} />;
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
                    label: "Tasks",
                    data: Object.values(categories),
                    backgroundColor: "#3b82f6",
                },
            ],
        };
        return <Bar data={data} />;
    }

    if (type === "progressOverTime") {
        const mapByDate = {};
        tasks.forEach(t => {
            const date = t.createdAt?.slice(0, 10);
            if (!mapByDate[date]) mapByDate[date] = { completed: 0, pending: 0 };
            if (t.status === "completed") mapByDate[date].completed += 1;
            else mapByDate[date].pending += 1;
        });

        const labels = Object.keys(mapByDate).sort();
        const data = {
            labels,
            datasets: [
                {
                    label: "Completed",
                    data: labels.map(d => mapByDate[d].completed),
                    borderColor: "#22c55e",
                    backgroundColor: "#22c55e",
                },
                {
                    label: "Pending",
                    data: labels.map(d => mapByDate[d].pending),
                    borderColor: "#f87171",
                    backgroundColor: "#f87171",
                },
            ],
        };
        return <Line data={data} />;
    }

    return null;
}
