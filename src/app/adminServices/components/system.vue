<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="12" vs-xs="12">
      <vs-card>
        <h3 class="card-title d-flex">
          Память
        </h3>

        <div>
          <SystemDiagrams></SystemDiagrams>
        </div>
      </vs-card>
    </vs-col>

    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="12" vs-xs="12">
      <vs-card>
        <h3 class="card-title d-flex">
          Процессор
        </h3>

        <div>
          <SystemCpu></SystemCpu>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import SystemDiagrams from "./system-diagrams";
import SystemCpu from "./system-cpu";
export default {
  components: {SystemDiagrams, SystemCpu},
  extends: {SystemDiagrams, SystemCpu},
  name: "AdminSystem",
  data() {
    return {
      data: null
    }
  },
};
</script>

