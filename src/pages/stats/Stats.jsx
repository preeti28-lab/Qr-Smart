import React, { useState, useEffect, useCallback, useMemo } from "react";
import AppViewer from "../../layouts/AppViewer";
import ActivityChart from "../../charts/ActivityChart";
import { useDispatch } from "react-redux";
import createAxiosInstance from "../../config/axiosConfig";
import ReactApexChart from "react-apexcharts";

const BASE_URL = "https://m.kcptl.in/procx";
const CHART_COLORS = [
  "#3b82f6",
  "#a855f7",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#f97316",
  "#8b5cf6",
];

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getDefaultDates = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);
  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
};

// ─── Shared ───────────────────────────────────────────────────────────────────
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-10 text-gray-400">
    <svg
      className="w-12 h-12 mb-3 opacity-25"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
    <p className="text-[14px] font-medium">
      Not enough data to show statistics
    </p>
  </div>
);

const SectionCard = ({ title, subtitle, children }) => (
  <div className="bg-white p-4 sm:p-5 rounded-xl shadow-[0px_1px_8px_-1px_#d1d5db]">
    <h3 className="font-bold text-[16px] sm:text-[17px] text-gray-800 mb-0.5">
      {title}
    </h3>
    {subtitle && (
      <p className="text-[12px] sm:text-[13px] text-gray-400 mb-3">
        {subtitle}
      </p>
    )}
    {children}
  </div>
);

// ─── useIsMobile hook ─────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

// ─── Horizontal Bar Chart ─────────────────────────────────────────────────────
const HorizontalBarChart = ({ data = [], labelKey }) => {
  const isMobile = useIsMobile();
  const labels = data.map((d) => d[labelKey] || "Unknown");
  const values = data.map((d) => d.total);
  const percs = data.map((d) => d.percentage);
  const rowH = isMobile ? 44 : 54;
  const height = labels.length * rowH + 50;

  const options = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
        animations: { enabled: true, speed: 500 },
        parentHeightOffset: 0,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 5,
          borderRadiusApplication: "end",
          barHeight: labels.length === 1 ? "28%" : "55%",
          dataLabels: { position: "top" },
        },
      },
      colors: CHART_COLORS,
      distributed: true,
      fill: { opacity: 1 },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        offsetX: 6,
        style: {
          fontSize: isMobile ? "11px" : "13px",
          fontFamily: "inherit",
          fontWeight: 700,
          colors: ["#1f2937"],
        },
        formatter: (val, { dataPointIndex }) =>
          isMobile
            ? `${val} (${percs[dataPointIndex]?.toFixed(0)}%)`
            : `${val}  (${percs[dataPointIndex]?.toFixed(1)}%)`,
        background: { enabled: false },
      },
      xaxis: {
        categories: labels,
        labels: {
          formatter: (v) => Math.round(v),
          style: {
            fontSize: isMobile ? "11px" : "13px",
            fontFamily: "inherit",
            colors: "#9ca3af",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: isMobile ? "12px" : "14px",
            fontFamily: "inherit",
            fontWeight: 600,
            colors: "#374151",
          },
          maxWidth: isMobile ? 90 : 140,
        },
      },
      tooltip: {
        y: {
          formatter: (val, { dataPointIndex }) =>
            `${val} scans  (${percs[dataPointIndex]?.toFixed(1)}%)`,
        },
      },
      legend: { show: false },
      grid: {
        borderColor: "#f3f4f6",
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
        padding: { left: isMobile ? 0 : 8 },
      },
      states: {
        hover: { filter: { type: "darken", value: 0.15 } },
        active: { filter: { type: "darken", value: 0.15 } },
      },
    }),
    [labels, percs, isMobile],
  );

  return (
    <ReactApexChart
      key={`${labels.join(",")}-${isMobile}`}
      options={options}
      series={[{ name: "Scans", data: values }]}
      type="bar"
      height={height}
    />
  );
};

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = ({ data = [], labelKey, sublabelKey }) => {
  const isMobile = useIsMobile();
  const MAX_SLICES = isMobile ? 5 : 7;
  const top = data.slice(0, MAX_SLICES);
  const others = data.slice(MAX_SLICES);
  const otherTotal = others.reduce((s, d) => s + d.total, 0);
  const otherPct = others.reduce((s, d) => s + d.percentage, 0);
  const slices =
    otherTotal > 0
      ? [
          ...top,
          { [labelKey]: "Others", total: otherTotal, percentage: otherPct },
        ]
      : top;
  const labels = slices.map((d) =>
    sublabelKey
      ? `${d[labelKey]}${d[sublabelKey] ? " (" + d[sublabelKey] + ")" : ""}`
      : d[labelKey] || "Unknown",
  );
  const values = slices.map((d) => d.total);
  const percs = slices.map((d) => d.percentage);
  const grandTotal = values.reduce((a, b) => a + b, 0);

  const options = useMemo(
    () => ({
      chart: {
        type: "donut",
        animations: { enabled: true, speed: 500 },
        toolbar: { show: false },
      },
      labels,
      colors: CHART_COLORS,
      legend: {
        position: isMobile ? "bottom" : "right",
        fontSize: isMobile ? "12px" : "13px",
        fontFamily: "inherit",
        fontWeight: 600,
        formatter: (label, opts) =>
          isMobile
            ? `${label} · ${percs[opts.seriesIndex]?.toFixed(0)}%`
            : `${label} — ${percs[opts.seriesIndex]?.toFixed(1)}%`,
        itemMargin: { vertical: isMobile ? 3 : 5, horizontal: 4 },
        offsetY: isMobile ? 0 : 0,
      },
      dataLabels: {
        enabled: !isMobile,
        formatter: (val) => `${val.toFixed(1)}%`,
        style: { fontSize: "11px", fontFamily: "inherit", fontWeight: 700 },
        dropShadow: { enabled: false },
      },
      plotOptions: {
        pie: {
          donut: {
            size: isMobile ? "70%" : "65%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                fontSize: isMobile ? "12px" : "14px",
                fontFamily: "inherit",
                fontWeight: 700,
                color: "#6b7280",
                formatter: () => grandTotal,
              },
              value: {
                fontSize: isMobile ? "22px" : "26px",
                fontFamily: "inherit",
                fontWeight: 800,
                color: "#111827",
              },
            },
          },
        },
      },
      tooltip: {
        y: {
          formatter: (val, { seriesIndex }) =>
            `${val} scans  (${percs[seriesIndex]?.toFixed(1)}%)`,
        },
      },
      stroke: { width: 2, colors: ["#ffffff"] },
      states: {
        hover: { filter: { type: "darken", value: 0.1 } },
        active: { filter: { type: "darken", value: 0.1 } },
      },
    }),
    [labels, values, percs, grandTotal, isMobile],
  );

  return (
    <ReactApexChart
      key={`${labels.join(",")}-${isMobile}`}
      options={options}
      series={values}
      type="donut"
      height={isMobile ? 340 : 320}
    />
  );
};

// ─── Hour of Day Chart ────────────────────────────────────────────────────────
const HourChart = ({ data = [] }) => {
  const isMobile = useIsMobile();
  const categories = data.map((d) => d.label);
  const values = data.map((d) => d.total);

  const options = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
        animations: { enabled: true, speed: 500 },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "72%",
          borderRadius: 3,
          borderRadiusApplication: "end",
        },
      },
      colors: ["#3b82f6"],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 0.4,
          gradientToColors: ["#93c5fd"],
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [0, 100],
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories,
        labels: {
          rotate: -45,
          rotateAlways: true,
          style: {
            fontSize: isMobile ? "8px" : "10px",
            fontFamily: "inherit",
            colors: "#9ca3af",
            fontWeight: 500,
          },
          // On mobile show every other hour label
          formatter: (val, idx) => {
            if (isMobile && typeof idx === "number" && idx % 2 !== 0) return "";
            return val;
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          formatter: (v) => Math.round(v),
          style: { fontSize: "12px", fontFamily: "inherit", colors: "#9ca3af" },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      tooltip: {
        y: { formatter: (v) => `${v} scans` },
        x: { formatter: (v) => `Hour: ${v}` },
      },
      grid: {
        borderColor: "#f3f4f6",
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
      },
      states: {
        hover: { filter: { type: "darken", value: 0.2 } },
        active: { filter: { type: "darken", value: 0.2 } },
      },
    }),
    [categories, isMobile],
  );

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: isMobile ? "520px" : "100%" }}>
        <ReactApexChart
          key={`hour-${isMobile}`}
          options={options}
          series={[{ name: "Scans", data: values }]}
          type="bar"
          height={isMobile ? 220 : 280}
        />
      </div>
    </div>
  );
};

// ─── Main Stats Page ──────────────────────────────────────────────────────────
const Stats = () => {
  const dispatch = useDispatch();
  const axios = createAxiosInstance(dispatch);

  const defaults = getDefaultDates();
  const [dateRange, setDateRange] = useState(defaults);
  const [tempRange, setTempRange] = useState(defaults);
  const [groupBy, setGroupBy] = useState("date");
  const [showScans, setShowScans] = useState(true);
  const [showUnique, setShowUnique] = useState(true);
  const [qrPage, setQrPage] = useState(1);

  const [summary, setSummary] = useState(null);
  const [activity, setActivity] = useState(null);
  const [browsers, setBrowsers] = useState(null);
  const [os, setOs] = useState(null);
  const [countries, setCountries] = useState(null);
  const [qrs, setQrs] = useState(null);
  const [cities, setCities] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [times, setTimes] = useState(null);

  const [loading, setLoading] = useState({
    summary: false,
    activity: false,
    browsers: false,
    os: false,
    countries: false,
    qrs: false,
    cities: false,
    languages: false,
    times: false,
  });
  const setLoad = (k, v) => setLoading((p) => ({ ...p, [k]: v }));

  const bp = useCallback(
    (extras = {}) =>
      new URLSearchParams({
        from: dateRange.from,
        to: dateRange.to,
        ...extras,
      }).toString(),
    [dateRange],
  );

  const doFetch = async (key, url, setter) => {
    setLoad(key, true);
    try {
      const { data } = await axios.get(url);
      if (data.success) setter(data);
    } catch (e) {
      console.error(key, e);
    } finally {
      setLoad(key, false);
    }
  };

  const fetchAll = useCallback(() => {
    doFetch("summary", `${BASE_URL}/qr-stats/summary?${bp()}`, (d) =>
      setSummary(d),
    );
    doFetch("browsers", `${BASE_URL}/qr-stats/browsers?${bp()}`, (d) =>
      setBrowsers(d.stats),
    );
    doFetch("os", `${BASE_URL}/qr-stats/os?${bp()}`, (d) => setOs(d.stats));
    doFetch("countries", `${BASE_URL}/qr-stats/countries?${bp()}`, (d) =>
      setCountries(d.stats),
    );
    doFetch("cities", `${BASE_URL}/qr-stats/cities?${bp()}`, (d) =>
      setCities(d.stats),
    );
    doFetch("languages", `${BASE_URL}/qr-stats/languages?${bp()}`, (d) =>
      setLanguages(d.stats),
    );
    doFetch("times", `${BASE_URL}/qr-stats/times?${bp()}`, (d) =>
      setTimes(d.stats),
    );
    doFetch(
      "qrs",
      `${BASE_URL}/qr-stats/qrs?${bp({ page: qrPage, limit: 10 })}`,
      (d) => setQrs(d),
    );
  }, [bp, qrPage]);

  const fetchActivity = useCallback(() => {
    doFetch(
      "activity",
      `${BASE_URL}/qr-stats/activity?${bp({ groupBy, showScans: true, showUniqueScans: true })}`,
      (d) => setActivity(d),
    );
  }, [bp, groupBy]);

  useEffect(() => {
    fetchAll();
    fetchActivity();
  }, [dateRange]);
  useEffect(() => {
    fetchActivity();
  }, [groupBy]);
  useEffect(() => {
    doFetch(
      "qrs",
      `${BASE_URL}/qr-stats/qrs?${bp({ page: qrPage, limit: 10 })}`,
      (d) => setQrs(d),
    );
  }, [qrPage]);

  const chartSeries = useMemo(() => {
    if (!activity) return [];
    const parse = (lbl) => {
      if (/^\d{2}-\d{2}-\d{4}$/.test(lbl)) {
        const [d, m, y] = lbl.split("-");
        return new Date(`${y}-${m}-${d}`).getTime();
      }
      if (/^[A-Za-z]+ \d{4}$/.test(lbl)) return new Date(`01 ${lbl}`).getTime();
      return new Date(`01 Jan ${lbl}`).getTime();
    };
    const s = [];
    if (showScans && activity.scans?.length)
      s.push({
        name: "Total Scans",
        data: activity.scans.map((x) => [parse(x.created), x.amount]),
      });
    if (showUnique && activity.uniqueScans?.length)
      s.push({
        name: "Unique Scans",
        data: activity.uniqueScans.map((x) => [parse(x.created), x.amount]),
      });
    return s;
  }, [activity, showScans, showUnique]);

  const languagesFormatted = useMemo(
    () =>
      (languages || []).map((l) => {
        let display = l.language?.toUpperCase() || "Unknown";
        try {
          display =
            new Intl.DisplayNames(["en"], { type: "language" }).of(
              l.language,
            ) || display;
        } catch {}
        return { ...l, languageDisplay: display };
      }),
    [languages],
  );

  return (
    <AppViewer>
      <div className="p-3 sm:p-4 w-full max-w-full overflow-x-hidden">
        {/* ── Header ── */}
        <h2 className="font-bold text-[24px] sm:text-[28px] text-gray-800 mb-3">
          Stats
        </h2>

        {/* ── Date Filter ── */}
        <div className="bg-white rounded-xl shadow-[0px_1px_8px_-1px_#d1d5db] p-3 sm:p-4 mb-4">
          <p className="text-[13px] font-semibold text-gray-500 mb-2">
            Filter by Date Range
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-x-2 flex-1">
              <label className="text-[13px] text-gray-600 font-semibold w-9 shrink-0">
                From
              </label>
              <input
                type="date"
                value={tempRange.from}
                onChange={(e) =>
                  setTempRange((p) => ({ ...p, from: e.target.value }))
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-blue-500 min-w-0"
              />
            </div>
            <div className="flex items-center gap-x-2 flex-1">
              <label className="text-[13px] text-gray-600 font-semibold w-9 shrink-0">
                To
              </label>
              <input
                type="date"
                value={tempRange.to}
                onChange={(e) =>
                  setTempRange((p) => ({ ...p, to: e.target.value }))
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-blue-500 min-w-0"
              />
            </div>
            <button
              onClick={() => setDateRange(tempRange)}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-[14px] font-semibold px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Period badge */}
        <div className="bg-blue-50 border border-blue-100 px-3 sm:px-4 py-2 rounded-lg flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
          <span className="text-blue-700 text-[13px] sm:text-[14px] font-bold">
            Analyzed period:
          </span>
          <span className="text-blue-600 text-[13px] sm:text-[14px] font-medium">
            {formatDate(dateRange.from)} — {formatDate(dateRange.to)}
          </span>
        </div>

        {/* ── Summary cards — always 3 cols ── */}
        <div className="w-full bg-white rounded-xl px-3 sm:px-4 py-4 sm:py-5 mb-4 shadow-[0px_1px_8px_-1px_#d1d5db]">
          {loading.summary ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              <div className="flex flex-col items-center justify-center py-2 px-1">
                <h2 className="text-[28px] sm:text-[40px] font-extrabold text-blue-600 leading-none">
                  {summary?.totalQrs ?? 0}
                </h2>
                <p className="text-[11px] sm:text-[13px] font-semibold text-gray-500 mt-1 text-center">
                  Total QRs
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-2 px-1">
                <h2 className="text-[28px] sm:text-[40px] font-extrabold text-green-600 leading-none">
                  {summary?.totalScans ?? 0}
                </h2>
                <p className="text-[11px] sm:text-[13px] font-semibold text-gray-500 mt-1 text-center">
                  Total Scans
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-2 px-1">
                <h2 className="text-[28px] sm:text-[40px] font-extrabold text-purple-600 leading-none">
                  {summary?.uniqueScans ?? 0}
                </h2>
                <p className="text-[11px] sm:text-[13px] font-semibold text-gray-500 mt-1 text-center">
                  Unique Scans
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Activity chart ── */}
        <SectionCard
          title="Activity"
          subtitle="Scan volume over the selected period"
        >
          {/* Controls row */}
          <div className="flex flex-col gap-3 mb-4">
            {/* Checkboxes */}
            <div className="flex items-center gap-x-4">
              <label className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showScans}
                  onChange={(e) => setShowScans(e.target.checked)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-[13px] sm:text-[14px] font-semibold text-gray-700">
                  Total Scans
                </span>
              </label>
              <label className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnique}
                  onChange={(e) => setShowUnique(e.target.checked)}
                  className="accent-purple-600 w-4 h-4"
                />
                <span className="text-[13px] sm:text-[14px] font-semibold text-gray-700">
                  Unique Scans
                </span>
              </label>
            </div>
            {/* GroupBy buttons */}
            <div className="flex items-center gap-x-2">
              {["date", "month", "year"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGroupBy(g)}
                  className={`border rounded-lg font-semibold text-[12px] sm:text-[13px] py-1.5 px-3 sm:px-4 transition-all ${groupBy === g ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500"}`}
                >
                  {g === "date"
                    ? "Day"
                    : g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {loading.activity ? (
            <LoadingSpinner />
          ) : (
            <ActivityChart series={chartSeries} groupBy={groupBy} />
          )}
        </SectionCard>

        {/* ── Charts grid — 1 col mobile, 2 col desktop ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <SectionCard
            title="Scans by OS"
            subtitle="Operating system breakdown"
          >
            {loading.os ? (
              <LoadingSpinner />
            ) : !os?.length ? (
              <EmptyState />
            ) : (
              <HorizontalBarChart data={os} labelKey="os" />
            )}
          </SectionCard>

          <SectionCard
            title="Scans by Browser"
            subtitle="Browser used to open QR code"
          >
            {loading.browsers ? (
              <LoadingSpinner />
            ) : !browsers?.length ? (
              <EmptyState />
            ) : (
              <HorizontalBarChart data={browsers} labelKey="browser" />
            )}
          </SectionCard>

          <SectionCard
            title="Scans by Country"
            subtitle="Geographic distribution"
          >
            {loading.countries ? (
              <LoadingSpinner />
            ) : !countries?.length ? (
              <EmptyState />
            ) : (
              <DonutChart data={countries} labelKey="countryName" />
            )}
          </SectionCard>

          <SectionCard
            title="Scans by City"
            subtitle="Top cities scanning your QR codes"
          >
            {loading.cities ? (
              <LoadingSpinner />
            ) : !cities?.length ? (
              <EmptyState />
            ) : (
              <DonutChart data={cities} labelKey="city" sublabelKey="region" />
            )}
          </SectionCard>

          {/* Language full width */}
          <div className="sm:col-span-2">
            <SectionCard
              title="Scans by Language"
              subtitle="Browser language at scan time"
            >
              {loading.languages ? (
                <LoadingSpinner />
              ) : !languagesFormatted?.length ? (
                <EmptyState />
              ) : (
                <HorizontalBarChart
                  data={languagesFormatted}
                  labelKey="languageDisplay"
                />
              )}
            </SectionCard>
          </div>
        </div>

        {/* ── Time of Day — full width, scrollable on mobile ── */}
        <div className="mt-4">
          <SectionCard
            title="Scans by Time of Day"
            subtitle="Hourly distribution · UTC time (add +5:30 for IST)"
          >
            {loading.times ? (
              <LoadingSpinner />
            ) : !times?.length ? (
              <EmptyState />
            ) : (
              <HourChart data={times} />
            )}
          </SectionCard>
        </div>

        {/* ── QR Leaderboard ── */}
        <div className="mt-4 mb-6">
          <SectionCard
            title="QR Code Leaderboard"
            subtitle="Most scanned QR codes in selected period"
          >
            {loading.qrs ? (
              <LoadingSpinner />
            ) : !qrs?.stats?.length ? (
              <EmptyState />
            ) : (
              <>
                <div className="overflow-x-auto -mx-1">
                  <table className="w-full min-w-[420px]">
                    <thead>
                      <tr className="border-b-2 border-gray-100">
                        <th className="text-left py-3 px-2 text-gray-400 font-semibold text-[12px] sm:text-[13px]">
                          #
                        </th>
                        <th className="text-left py-3 px-2 text-gray-400 font-semibold text-[12px] sm:text-[13px]">
                          QR Label
                        </th>
                        <th className="text-center py-3 px-2 text-gray-400 font-semibold text-[12px] sm:text-[13px]">
                          Scans
                        </th>
                        <th className="text-center py-3 px-2 text-gray-400 font-semibold text-[12px] sm:text-[13px]">
                          Unique
                        </th>
                        <th className="text-right py-3 px-2 text-gray-400 font-semibold text-[12px] sm:text-[13px] hidden sm:table-cell">
                          Last Scanned
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {qrs.stats.map((item, i) => (
                        <tr
                          key={item.qrId}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-2 text-[13px] text-gray-400">
                            {(qrPage - 1) * 10 + i + 1}
                          </td>
                          <td className="py-3 px-2 text-[13px] sm:text-[14px] font-semibold text-gray-800 max-w-[120px] sm:max-w-[220px] truncate">
                            {item.qrLabel || "Untitled QR"}
                          </td>
                          <td className="py-3 px-2 text-[14px] sm:text-[15px] text-center font-bold text-blue-600">
                            {item.total}
                          </td>
                          <td className="py-3 px-2 text-[14px] sm:text-[15px] text-center font-bold text-purple-600">
                            {item.uniqueScans}
                          </td>
                          <td className="py-3 px-2 text-[12px] text-right text-gray-400 hidden sm:table-cell">
                            {item.lastScannedAt
                              ? formatDate(item.lastScannedAt)
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {qrs.totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <p className="text-[12px] sm:text-[13px] text-gray-400">
                      Page {qrs.page} of {qrs.totalPages} · {qrs.total} total
                    </p>
                    <div className="flex items-center gap-x-2">
                      <button
                        disabled={qrPage === 1}
                        onClick={() => setQrPage((p) => p - 1)}
                        className="text-[13px] font-semibold px-4 py-2 border rounded-lg disabled:opacity-40 hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        Prev
                      </button>
                      <button
                        disabled={qrPage >= qrs.totalPages}
                        onClick={() => setQrPage((p) => p + 1)}
                        className="text-[13px] font-semibold px-4 py-2 border rounded-lg disabled:opacity-40 hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </SectionCard>
        </div>
      </div>
    </AppViewer>
  );
};

export default Stats;
