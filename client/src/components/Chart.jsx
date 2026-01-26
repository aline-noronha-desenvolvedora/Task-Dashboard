import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { getTaskStatusCounts } from "../utils/chartUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Chart({ tasks = [] }) {
    const { completed, inProgress, pending } = getTaskStatusCounts(tasks);

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
