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

export const commonOptions = {
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
