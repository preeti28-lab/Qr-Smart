import React, { useMemo, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    useEffect(() => {
        const h = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', h);
        return () => window.removeEventListener('resize', h);
    }, []);
    return isMobile;
};

const ActivityChart = ({ series = [], groupBy = "date" }) => {
    const isMobile = useIsMobile();

    const { categories, barSeries } = useMemo(() => {
        if (!series.length) return { categories: [], barSeries: [] };

        const labelFormat = (ts) => {
            if (groupBy === "year")  return moment(ts).format("YYYY");
            if (groupBy === "month") return moment(ts).format("MMM YY");
            return isMobile ? moment(ts).format("DD MMM") : moment(ts).format("DD MMM");
        };

        const allTs = new Set();
        series.forEach(s => s.data.forEach(([ts]) => allTs.add(ts)));
        const sortedTs = Array.from(allTs).sort((a, b) => a - b);
        const cats = sortedTs.map(labelFormat);

        const tsToIndex = {};
        sortedTs.forEach((ts, i) => { tsToIndex[ts] = i; });

        const bar = series.map(s => {
            const values = new Array(sortedTs.length).fill(0);
            s.data.forEach(([ts, val]) => {
                const idx = tsToIndex[ts];
                if (idx !== undefined) values[idx] = val;
            });
            return { name: s.name, data: values };
        });

        return { categories: cats, barSeries: bar };
    }, [series, groupBy, isMobile]);

    const colWidth = categories.length === 1 ? "20%"
        : categories.length <= 5  ? "35%"
        : categories.length <= 10 ? "50%"
        : "72%";

    const options = useMemo(() => ({
        chart: {
            type: "bar",
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: true, easing: "easeinout", speed: 400 },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: colWidth,
                borderRadius: 4,
                borderRadiusApplication: "end",
            },
        },
        colors: ["#3b82f6", "#a855f7"],
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ["transparent"] },
        xaxis: {
            categories,
            labels: {
                rotate: categories.length > 7 ? -45 : -20,
                rotateAlways: categories.length > 7,
                style: {
                    fontSize: isMobile ? "10px" : "12px",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    colors: "#6b7280",
                },
                trim: true,
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            min: 0,
            forceNiceScale: true,
            labels: {
                formatter: (val) => Math.round(val),
                style: {
                    fontSize: isMobile ? "11px" : "13px",
                    fontFamily: "inherit",
                    colors: "#9ca3af",
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: isMobile ? "11px" : "13px",
            markers: { radius: 6 },
            itemMargin: { horizontal: 8 },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: { formatter: (val) => `${val} scans` },
        },
        grid: {
            borderColor: "#f3f4f6",
            strokeDashArray: 4,
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: false } },
        },
        fill: { opacity: 1 },
        states: {
            hover: { filter: { type: "darken", value: 0.15 } },
        },
    }), [categories, isMobile, colWidth]);

    if (!barSeries.length || !categories.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-[13px] font-medium">No scan activity in selected period</p>
            </div>
        );
    }

    return (
        <div id="qr-activity-chart">
            <ReactApexChart
                key={`${groupBy}-${categories.length}-${isMobile}`}
                options={options}
                series={barSeries}
                type="bar"
                height={isMobile ? 240 : 300}
            />
        </div>
    );
};

export default ActivityChart;