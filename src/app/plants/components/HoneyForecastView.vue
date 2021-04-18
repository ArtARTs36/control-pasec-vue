<template>
  <vs-row vs-justify="center">
    <vs-card>
      <div slot="header">
        <h4>Объем производства меда</h4>
      </div>
      Растение: {{ data.plant.name }}
      <hr/>
      Период: {{ data.request.start }} - {{ data.request.end }}
      <hr/>
      Площадь: {{ data.request.square }}
      <hr/>
      Количество пчел: {{ data.request.bees }}
      <hr/>
      Прогнозируемый объем производства меда: {{ data.weight }} кг
      <hr/>
    </vs-card>

    <vs-card v-if="data.days">
      <div slot="header">
        <h4>Погода</h4>
      </div>

      <day-chart v-bind:days="data.days"></day-chart>
    </vs-card>
  </vs-row>
</template>

<script>
import DayChart from "./DayChart";

export default {
  components: {DayChart},
  extends: {DayChart},

  name: 'HoneyForecastView',
  props: [
      'data',
  ],

  created() {
    document.title = 'Расчет объема производства меда';
  },

  methods: {
  },
  mounted() {

  }
}
</script>
