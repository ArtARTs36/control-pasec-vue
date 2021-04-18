<script>
import {Bar} from "vue-chartjs";

export default {
  extends: Bar,

  props: [
      'days',
  ],

  data: function () {
    return {
      'data': {
        'labels': [],
      },
    };
  },

  methods: {
    load: function () {
      this.data.datasets = [];

      this.days.forEach(function (day) {
        this.data.datasets.push({
          'data': [day.temperature],
          'label': day.date,
        });
        this.data.labels.push(day.date);
      }, this);

      this.render();
    },
    getRandomColor: function () {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    render: function () {
      this.renderChart(
          {
            labels: this.data.labels,
            datasets: this.data.datasets
          },
          {
            responsive: true,
            maintainAspectRatio: false,
            scaleShowValues: false,
            scales: {
              xAxes: [{
                barThickness: 27,
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  autoSkip: true,
                }
              }],
            },
            type: 'bar',
            legend: false,
          },
      );
    }
  },
  mounted() {
    if (this.days) {
      this.load();
    }
  },
  watch: {
    days: function (val) {
      this.load();
    }
  }
};
</script>
