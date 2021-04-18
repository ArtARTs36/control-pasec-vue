<script>
import {Doughnut} from "vue-chartjs";
export default {
  extends: Doughnut,
  name: "SystemDiagrams",
  props: [
      'systemData'
  ],
  methods: {
    load: function () {
        this.data = {
          'labels': [
            'Всего памяти',
            'Доступно памяти',
          ],
          'datasets': [
            {
              'data': [
                this.systemData.memory.total,
                this.systemData.memory.available,
              ],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
              ],
            }
          ]
        };

        this.render();
    },
    render: function () {
      this.renderChart(
          {
            labels: this.data.labels,
            datasets: this.data.datasets
          },
          {
            responsive: true, maintainAspectRatio: false,
          }
      );
    }
  },
  watch: {
    systemData: function (val) {
      if (val !== undefined) {
        this.load();
      }
    },
  },
};
</script>

