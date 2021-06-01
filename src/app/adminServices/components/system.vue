<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="12" vs-xs="12">
      <vs-card>
        <h3 class="card-title d-flex">
          Память
        </h3>

        <div>
          <SystemDiagrams v-bind:system-data="systemData"></SystemDiagrams>
        </div>
      </vs-card>
    </vs-col>

    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="12" vs-xs="12">
      <vs-card>
        <h3 class="card-title d-flex">
          Процессор
        </h3>

        <div>
          <SystemCpu v-bind:system-data="systemData"></SystemCpu>
        </div>
      </vs-card>
    </vs-col>

    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="12" vs-xs="12">
      <vs-card>
        <h3 class="card-title d-flex">
          Журнал
        </h3>

        <div>
            <mdb-tbl bordered style="overflow-y: scroll; max-height: 400px">
              <mdb-tbl-head color="light">
                <tr>
                  <th scope="col">Дата</th>
                  <th scope="col">ЦПУ. Пользователь</th>
                  <th scope="col">ЦПУ. Система</th>
                  <th scope="col">Память. Всего</th>
                  <th scope="col">Память. Доступно</th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr v-for="item in records">
                  <td scope="row">{{ new Date(item.date).toLocaleString() }}</td>
                  <td :class="getStateColorClass(item.cpu.state.id)">{{ item.cpu.user }} %</td>
                  <td :class="getStateColorClass(item.cpu.state.id)">{{ item.cpu.system }} %</td>
                  <td :class="getStateColorClass(item.memory.state.id)">{{ item.memory.total }} гб</td>
                  <td :class="getStateColorClass(item.memory.state.id)">{{ item.memory.available }} гб</td>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<style>
.cell-green {
  color: green;
}
.cell-green-yellow {
  color: forestgreen;
}
.cell-orange {
  color: orange;
}
.cell-gray {
  color: darkgray;
}
.cell-red {
  color: red;
}
</style>

<script>
import SystemDiagrams from "./system-diagrams";
import SystemCpu from "./system-cpu";
import { mdbTbl, mdbTblHead, mdbTblBody, mdbScrollbar } from 'mdbvue';
export default {
  components: {
    SystemDiagrams,
    SystemCpu,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbScrollbar
  },
  extends: {SystemDiagrams, SystemCpu},
  name: "AdminSystem",
  data() {
    return {
      systemData: null,
      records: null,
    }
  },
  methods: {
    load: function () {
      this.$http.get(window.API_URL + '/admin/system/snapshot').then((response) => {
        this.systemData = response.data.data;
      });
    },
    loadRecords: function () {
      this.$http.get(window.API_URL + '/admin/system/snapshots').then((response) => {
        this.records = response.data.data;
      });
    },
    getStateColorClass(state) {
      const stateColors = {
        1 : 'green',
        2 : 'green-yellow',
        3 : 'orange',
        4 : 'gray',
        5 : 'red',
      };

      return 'cell-' + stateColors[state]
    },
  },
  mounted() {
    this.load();
    this.loadRecords();
  }
};
</script>

