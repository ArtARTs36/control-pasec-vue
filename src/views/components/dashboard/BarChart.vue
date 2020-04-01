<script>
    import {Bar} from "vue-chartjs";

    export default {
        extends: Bar,
        data() {
            return {
                data: null
            }
        },

        methods: {
            load: function () {
                this.$http.get(API_URL + '/vocab/currency-courses').then((response) => {
                    this.data = response.data;

                    this.data.datasets.forEach(function (dataset) {
                        dataset.backgroundColor = this.getRandomColor();
                    }, this);

                    this.render();
                });
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
                        responsive: true, maintainAspectRatio: false, scales: {
                            xAxes: [{
                                barThickness: 7,
                            }]
                        }
                    }
                );
            }
        },
        mounted() {
            this.load();
        }
    };
</script>
