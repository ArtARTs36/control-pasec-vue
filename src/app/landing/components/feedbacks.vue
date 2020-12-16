<template>
  <vs-row vs-justify="center">
    <vs-card>
      <div slot="header">
        <h4>Обратная связь</h4>
      </div>

      <div class="table-responsive">
        <table class="table v-middle border">
          <thead>
          <tr class="">
            <th class="border-top-0">#</th>
            <th class="border-top-0">Дата</th>
            <th class="border-top-0">Сообщение</th>
            <th class="border-top-0">Автор</th>
            <th class="border-top-0">Действия</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in reports">
            <td>{{ item.id }}</td>
            <td>{{ item.created_at }}</td>
            <td>{{ item.message | cutText(50) }}</td>
            <td>{{ item.people_title }}</td>
            <td>
              <router-link :to="{ name: 'LandingFeedBackShow', params: { id: item.id }}">
                <i class="material-icons" title="Посмотреть">
                  visibility
                </i>
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <vs-pagination
          color="#f91f43"
          :total="totalPages"
          prev-icon="arrow_back" next-icon="arrow_forward"
          @change="loadReports"
          v-if="totalPages > 1"
      ></vs-pagination>
    </vs-card>
  </vs-row>
</template>

<script>
import { http } from '@/plugins/http';
export default {
  name: "LandingFeedBacksList",
  data: () => ({
    reports: [],
    error: null,
    totalCount: null,
    maxCountEntriesForOnePage: 10,
    currentPage: 0,
    totalPages: null,
  }),

  created() {
    this.loadReports(1);

    document.title = 'Обратная связь';
  },

  methods: {
    loadReports(page) {
      if (this.currentPage === page) {
        return;
      }

      http.get(window.API_LANDING_FEEDBACKS_INDEX + 'page-' + page)
          .then(response => {
            this.reports = response.data.data;
            this.totalCount = response.data.meta.total;
            this.totalPages = response.data.meta.last_page;
            this.currentPage = page;
          })
          .catch(e => {
            this.error = e;
          });
    },
  }
};
</script>
