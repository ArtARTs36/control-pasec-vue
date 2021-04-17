<script>
import {Doughnut} from "vue-chartjs";
export default {
  extends: Doughnut,
  name: "SystemCpu",
  data() {
    return {
      data: null
    }
  },
  methods: {
    load: function () {
      this.$http.get(window.API_URL + '/admin/system/snapshot').then((response) => {
        let data = response.data.data;

        this.data = {
          'labels': [
              'Использовано пользователем',
              'Использовано системой',
              'Осталось',
          ],
          'datasets': [
            {
              'data': [
                data.cpu.user,
                data.cpu.system,
                data.cpu.idle,
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
      });
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
  mounted() {
    this.load();
  }
};
</script>

