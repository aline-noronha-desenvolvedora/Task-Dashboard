import { Pie } from "react-chartjs-2";
import { commonOptions } from "./chartSetup";

export default function StatusChart({ tasks = [] }) {
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
