// Data penjualan ilustrasi. Ubah nilai di sini untuk mencoba data sendiri.
const salesData = [
    { month: "Januari", units: 45, revenue: 900000 },
    { month: "Februari", units: 52, revenue: 1040000 },
    { month: "Maret", units: 48, revenue: 960000 },
    { month: "April", units: 65, revenue: 1300000 },
    { month: "Mei", units: 72, revenue: 1440000 },
    { month: "Juni", units: 88, revenue: 1760000 }
];

const formatRupiah = (value) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
}).format(value);

const formatCompact = (value) => {
    if (value >= 1000000) {
        return "Rp " + (value / 1000000).toLocaleString("id-ID", { maximumFractionDigits: 2 }) + " jt";
    }
    return formatRupiah(value);
};

function updateStatistics() {
    const totalUnits = salesData.reduce((sum, item) => sum + item.units, 0);
    const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
    const averageRevenue = totalRevenue / salesData.length;
    const bestMonth = salesData.reduce((best, item) => item.revenue > best.revenue ? item : best, salesData[0]);

    document.getElementById("heroRevenue").textContent = formatRupiah(totalRevenue);
    document.getElementById("totalRecords").innerHTML = `${salesData.length} <small>bulan</small>`;
    document.getElementById("totalUnits").innerHTML = `${totalUnits.toLocaleString("id-ID")} <small>unit</small>`;
    document.getElementById("averageRevenue").textContent = formatCompact(averageRevenue);
    document.getElementById("bestMonth").textContent = bestMonth.month;
    document.getElementById("insightMonth").textContent = bestMonth.month;
    document.getElementById("insightRevenue").textContent = formatRupiah(bestMonth.revenue);
    document.getElementById("insightUnits").textContent = `${totalUnits.toLocaleString("id-ID")} unit`;
}

function renderTable(data) {
    const body = document.getElementById("dataTable");
    if (data.length === 0) {
        body.innerHTML = '<tr><td colspan="4">Data tidak ditemukan. Coba kata kunci lain.</td></tr>';
    } else {
        body.innerHTML = data.map(item => {
            const isHigh = item.revenue >= 1300000;
            return `<tr>
                <td>${item.month}</td>
                <td>${item.units} unit</td>
                <td>${formatRupiah(item.revenue)}</td>
                <td><span class="category ${isHigh ? "" : "normal"}">${isHigh ? "Di atas rata-rata" : "Reguler"}</span></td>
            </tr>`;
        }).join("");
    }
    document.getElementById("tableCount").textContent = `Menampilkan ${data.length} dari ${salesData.length} baris`;
}

let mainChart;

function createMainChart(mode = "revenue") {
    const canvas = document.getElementById("mainChart");
    if (typeof Chart === "undefined") {
        canvas.parentElement.innerHTML = "<p>Grafik tidak dapat dimuat. Periksa koneksi internet untuk memuat Chart.js.</p>";
        return;
    }

    const isRevenue = mode === "revenue";
    const labels = salesData.map(item => item.month);
    const values = salesData.map(item => isRevenue ? item.revenue : item.units);

    document.getElementById("mainChartTitle").textContent = isRevenue ? "Perkembangan omzet" : "Perkembangan unit terjual";
    document.getElementById("mainChartSubtitle").textContent = isRevenue ? "Total pendapatan per bulan" : "Jumlah produk terjual per bulan";
    document.getElementById("chartLegend").textContent = isRevenue ? "Omzet bulanan" : "Unit terjual";

    if (mainChart) mainChart.destroy();

    mainChart = new Chart(canvas, {
        type: isRevenue ? "line" : "bar",
        data: {
            labels,
            datasets: [{
                label: isRevenue ? "Omzet" : "Unit terjual",
                data: values,
                borderColor: "#1d4ed8",
                backgroundColor: isRevenue ? "rgba(29,78,216,.1)" : labels.map((_, i) => i === values.length - 1 ? "#1d4ed8" : "rgba(59,130,246,.4)"),
                fill: isRevenue,
                tension: .35,
                borderWidth: 3,
                pointRadius: isRevenue ? 4 : 0,
                pointHoverRadius: 6,
                pointBackgroundColor: "#1d4ed8",
                pointBorderColor: "#ffffff",
                borderRadius: isRevenue ? 0 : 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: false, mode: "index" },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "#0f2347",
                    titleColor: "#ffffff",
                    bodyColor: "#bcd2ff",
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: context => isRevenue ? formatRupiah(context.parsed.y) : `${context.parsed.y} unit`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: "#55657d", font: { size: 11 } },
                    border: { color: "rgba(15,31,61,.12)" }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: "rgba(15,31,61,.08)" },
                    ticks: {
                        color: "#55657d",
                        font: { size: 10 },
                        callback: value => isRevenue ? (value >= 1000000 ? (value / 1000000).toLocaleString("id-ID") + " jt" : value) : value
                    },
                    border: { display: false }
                }
            }
        }
    });
}

// Pencarian tabel berdasarkan nama bulan.
document.getElementById("searchData").addEventListener("input", event => {
    const keyword = event.target.value.toLocaleLowerCase("id-ID").trim();
    const filtered = salesData.filter(item => item.month.toLocaleLowerCase("id-ID").includes(keyword));
    renderTable(filtered);
});

// Tombol untuk mengganti visualisasi omzet dan jumlah unit.
document.querySelectorAll(".chart-switch").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".chart-switch").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        createMainChart(button.dataset.chart);
    });
});

// Menu mobile.
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});
navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// Efek muncul saat bagian website masuk ke layar.
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
} else {
    document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
}

updateStatistics();
renderTable(salesData);
createMainChart("revenue");
