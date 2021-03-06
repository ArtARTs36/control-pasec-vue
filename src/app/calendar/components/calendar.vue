<template>
  <div class="text-center section">
    <h2 class="h2">Календарь мероприятий</h2>
    <br/>
    <v-calendar
        class="custom-calendar max-w-full"
        :masks="masks"
        :attributes="attributes"

        @update:to-page="switchPage"
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
                v-for="attr in attributes"
                class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                :class="attr.customData.class"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      masks: {
        weekdays: 'WWW',
      },
      attributes: [],
    };
  },

  created() {
    document.title = 'Календарь мероприятий';
  },

  methods: {
    loadEvents(startDate, endDate) {
      const URL = window.API_URL + '/calendar?start_date='+ startDate + '&end_date=' + endDate;

      this.$http.get(URL)
          .then(response => {
            this.prepareEvents(response.data.data);
          })
          .catch(e => {
            this.error=e;
          });
    },
    prepareEvents(events) {
      events.forEach(function (dataset) {
        // bg-teal-500 text-white
        let _class = 'bg-indigo-500 text-white';

        switch (dataset.type) {
          case 'holiday':
            if (dataset.title === 'Сокращенный день') {
              _class = 'bg-pink-500 text-white';
            } else {
              _class = 'bg-red-600 text-white';
            }
            break;
          case 'supply':
            _class = 'bg-blue-500 text-white';
        }

        this.attributes.push({
          'key': 1,
          customData: {
            title: dataset.title,
            class: _class,
          },
          dates: new Date(dataset.date.split('-')),
        });
      }, this);
    },
    switchPage(e){
      const start = e.year + "-" + e.month + "-01";
      const end = e.year + "-" + e.month + "-" + this.getLastDayOfMonth(e.year, e.month);

      this.loadEvents(start, end);
    },
    getLastDayOfMonth(year, month) {
      let date = new Date(year, month, 0);
      return date.getDate();
    },
  }
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
::v-deep .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
& .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
& .vc-weeks {
    padding: 0;
  }
& .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
& .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
&.weekday-1,
&.weekday-7 {
   background-color: #eff8ff;
 }
&:not(.on-bottom) {
   border-bottom: var(--day-border);
&.weekday-1 {
   border-bottom: var(--day-border-highlight);
 }
}
&:not(.on-right) {
   border-right: var(--day-border);
 }
}
& .vc-day-dots {
    margin-bottom: 5px;
  }
}

.bg-red-600 {
  --bg-opacity: 1;
  background-color: #e53e3e;
  background-color: rgba(229,62,62,var(--bg-opacity));
}

.bg-blue-500 {
  --bg-opacity: 1;
  background-color: #4299e1;
  background-color: rgba(66,153,225,var(--bg-opacity));
}

.bg-teal-500 {
  --bg-opacity: 1;
  background-color: #38b2ac;
  background-color: rgba(56,178,172,var(--bg-opacity));
}

.bg-indigo-500 {
  --bg-opacity: 1;
  background-color: #667eea;
  background-color: rgba(102,126,234,var(--bg-opacity));
}

.bg-pink-500 {
  --bg-opacity: 1;
  background-color: #ed64a6;
  background-color: rgba(237,100,166,var(--bg-opacity));
}
</style>
