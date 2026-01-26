import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function Chart({ tasks = [] }) {
    const completed = tasks.filter(t => t.status === "completed").length;
    const inProgress = tasks.filter(t => t.status === "in_progress").length;
    const pending = tasks.filter(t => t.status === "pending").length;

    const data = {
        labels: ["Completed", "In Progress", "Pending"],
        datasets: [
            {
                label: "Tasks",
                data: [completed, inProgress, pending],
                backgroundColor: ["#22c55e", "#3b82f6", "#facc15"],
            },
        ],
    };

    return <Bar data={data} options={{ responsive: true }} />;
}
