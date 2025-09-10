interface SpendingCategoryWidgetProps {
    color: string,
    section: string,
    percentage: number,
    cost: number
}

    const colorMap: {
        [key: string]: {
        bg: string;
        section: string;
        numbers: string;
        };
    } = {
        red: {
            bg: "bg-red-100",
            section: "text-red-600",
            numbers: "text-red-800"
        },
        orange: {
            bg: "bg-orange-100",
            section: "text-orange-600",
            numbers: "text-orange-800"
        },
        green: {
            bg: "bg-green-100",
            section: "text-green-600",
            numbers: "text-green-800"
        }
    }

const SpendingCategoryWidget = ({color, section, percentage, cost}: SpendingCategoryWidgetProps) => {
    const colors = colorMap[color] || colorMap["red"];

    return(
        <div className={`w-full flex justify-center`}>
            <div className={`p-4 w-11/12 -mt-2 flex flex-col items-center gap-2 ${colors.bg} rounded-2xl`}>
                <p className={`text-2xl font-bold ${colors.section}`}>{section === "Miscellaneous" ? "Misc" :section}</p>
                <p className={`text-3xl font-extrabold ${colors.numbers}`}>{isFinite(percentage) ? percentage.toFixed(0) : "0"}%</p>
                <p className={`text-2xl font-extrabold ${colors.numbers}`}>${cost ? cost : "0.00"}</p>
            </div>
        </div>
    );
}

export default SpendingCategoryWidget