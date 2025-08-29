// 仅在页面上存在 canvas 时才渲染
document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('trainingChart');
  if (!el || !window.Chart) return;

  new Chart(el, {
    type: 'bar',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        { label: 'Cardio (min)', data: [30,20,40,25,35,50,20] },
        { label: 'Strength (min)', data: [20,25,15,30,20,25,10] }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: { y: { beginAtZero: true } }
    }
  });
});
