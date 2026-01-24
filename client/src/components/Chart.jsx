import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart({ tasks }) {
    const completedCount = tasks.filter((t) => t.status === "completed").length;
    const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
    const pendingCount = tasks.filter((t) => t.status === "pending").length;

    const data = {
        labels: ["Completed", "In Progress", "Pending"],
        datasets: [
            {
                label: "Tasks",
                data: [completedCount, inProgressCount, pendingCount],
                backgroundColor: ["#22c55e", "#3b82f6", "#facc15"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Tasks by Status" },
        },
    };

    return (
        <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Task Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
}
