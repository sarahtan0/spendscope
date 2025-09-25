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
        <div className={`w-full sm:h-full flex justify-center items-center`}>
            <div className={`px-3 sm:h-full p-2 sm:p-0 w-11/12 grid grid-cols-3 sm:flex sm:flex-col sm:justify-center items-center gap-2 ${colors.bg} rounded-3xl sm:rounded-2xl`}>
                <p className={`col-span-2 text-3xl sm:text-2xl font-bold ${colors.section}`}>{section === "Miscellaneous" ? "Misc" :section}</p>
                <div className={`sm:h-1/2 flex flex-col`}>
                    <p className={`text-right sm:text-center text-xl sm:text-3xl font-extrabold ${colors.numbers}`}>{isFinite(percentage) ? percentage.toFixed(0) : "0"}%</p>
                    <p className={`text-right sm:text-center text-l sm:text-2xl ${colors.numbers}`}>${cost ? Math.round(cost * 100) / 100 : "0.00"}</p>
                </div>
            </div>
        </div>
    );
}

export default SpendingCategoryWidget