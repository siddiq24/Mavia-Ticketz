function dummy() {
    const data = [];
    for (let i = 1; i <= 12; i++) {
        const random = Math.floor(Math.random() * 400) + 200;
        data.push(random);
    }
    return data;
}

const salesData = {
    'Avenger: End Game': dummy(),
    'Kenangan di ruang Tamu': dummy(),
    'Udin & Idin': dummy(),
    'Gayung Si Saksi Bisu': dummy()
};

const ticketSalesData = {
    Action: dummy(),
    Thrill: dummy(),
    Gore: dummy(),
    Fantasy: dummy(),
    Cartoon: dummy(),
    Adventure: dummy(),
};

function createChart(Id, dataset = dummy()) {
    const ctx = document.getElementById(Id).getContext('2d');

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [{
            label: 'Pendapatan',
            data: dataset,
            fill: true,
            borderColor: '#0066ff',
            backgroundColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return null;

                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, 'rgba(0, 102, 255, 0.4)');
                gradient.addColorStop(1, 'rgba(0, 102, 255, 0)');
                return gradient;
            },
            tension: 0.6,
            pointBackgroundColor: '#0066ff',
            pointBorderColor: '#ffffff',
            pointRadius: context => context.hovered ? 6 : 0,
            pointHoverRadius: 10
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => `$${value}`
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: context => `$${context.parsed.y}`
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}

createChart('salesChart', salesData['Avenger: End Game']);
createChart('ticketSales', ticketSalesData['Adventure']);

// ATAAAAASSSSSSS
const formSales = document.getElementById('formSalesChart');
const movie = document.getElementById('movie-name');

formSales.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('data = '+ salesData[movie.value])
    
    const current = Chart.getChart('salesChart');
    if (current) current.destroy();
    
    const title = movie.value;
    const sales = salesData[title];
    
    document.getElementById('movieName').textContent = title;
    
    if (sales) {
        createChart('salesChart', sales);
    } else {
        alert(`Data "${title}" tidak ditemukan dalam salesData.`);
    }
});

// BAWAAAAHHHHHHH
const formTicket = document.getElementById('formTicketSales');
const genreInput = document.getElementById('ticket-genre');
const cityInput = document.getElementById('city');

formTicket.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('data = '+ salesData[genreInput.value])

    const current = Chart.getChart('ticketSales');
    if (current) current.destroy();

    const city = cityInput.value;
    const genre = genreInput.value;
    const ticketSales = ticketSalesData[genre];

    document.getElementById('ctgrCity').textContent = genre +', '+ city;

    if (ticketSales) {
        createChart('ticketSales', ticketSales);
    } else {
        alert(`Genre "${genre}" tidak ditemukan dalam ticketSalesData.`);
    }

});