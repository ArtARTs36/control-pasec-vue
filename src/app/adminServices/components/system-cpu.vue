<script>
import {Doughnut} from "vue-chartjs";
export default {
  extends: Doughnut,
  name: "SystemCpu",
  props: [
    'systemData'
  ],
  methods: {
    load: function () {
        this.data = {
          'labels': [
              'Использовано пользователем',
              'Использовано системой',
              'Осталось',
          ],
          'datasets': [
            {
              'data': [
                this.systemData.cpu.user,
                this.systemData.cpu.system,
                this.systemData.cpu.idle,
              ],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(54, 162, 23)',
              ],
            },
          ],
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

