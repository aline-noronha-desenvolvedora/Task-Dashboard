import { Bar } from "react-chartjs-2";
import { commonOptions } from "./chartSetup";

export default function CategoryChart({ tasks = [] }) {
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
