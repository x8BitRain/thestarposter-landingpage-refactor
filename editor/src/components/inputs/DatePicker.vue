<template>
  <div class="input-container" v-if="currentDate">
    <label for="DatePicker">{{ $t("date") }}</label>
    <div id="datepicker">
      <select id="day" :value="currentDate.day" @change="onDayChange">
        <option v-for="day in days" :key="day" :selected="day == currentDay">
          {{ day }}
        </option>
      </select>
      <select id="month" @change="onMonthChange">
        <option
          v-for="month in months"
          :key="month"
          :selected="month === currentMonth"
        >
          {{ $t("months." + month.toLowerCase()) }}
        </option>
      </select>
      <select id="year" :value="currentDate.year" @change="onYearChange">
        <option v-for="year in years" :key="year">
          {{ year }}
        </option>
      </select>
    </div>
    <div id="timepicker">
      <input
        id="time"
        name="time"
        type="time"
        v-if="!isSafari"
        :value="currentDate.time"
        @input="onTimeChange"
      />
      <vue-timepicker
        v-if="isSafari"
        format="HH:mm"
        v-model="safariDatePickerData"
        :value="currentDate.time"
        @change="onTimeChange"
      ></vue-timepicker>
      <div id="display-time" @click="toggleShowTime">
        <label>{{ $t("advancedOpts.displayTime") }}</label>
        <input name="display-time" type="checkbox" :checked="showTime" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { isSafari, isiOS } from "../../util/isSafari";
import { ICurrentDate } from "../../posterTypes";
import {
  getMonths,
  getDaysInMonth,
  getYears,
  getCurrentDay,
  dateToDatePickerDate,
  getMonthNumber,
  fixDateIfInvalid,
  formDateString,
  formatDate,
  safariDatePickerData
} from "../../util/dateTimeUtil";
import "../../assets/css/inputs.scss";

export default Vue.extend({
  name: "DatePicker",
  model: {
    prop: "date",
    event: "change"
  },
  components: {
    "vue-timepicker": () =>
      import(/* webpackChunkName: "timepicker" */ "./SafariTimepicker.vue")
  },
  props: {
    date: {
      type: Date,
      required: true
    },
    displayTime: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    currentDate: undefined,
    days: undefined,
    showTime: false,
    isSafari: isSafari && !isiOS,
    vueTimePicker: "vue-timepicker",
    safariDatePickerData: isSafari ? safariDatePickerData() : null
  }),
  computed: {
    years(): number[] {
      return getYears();
    },
    months(): string[] {
      return getMonths();
    },
    monthNumber(): number {
      return getMonthNumber(this.currentDate.month);
    },
    currentDay() {
      return getCurrentDay();
    },
    currentMonth(): string {
      return getMonths()[this.currentDate.month];
    }
  },
  // watch: {
  //   currentDate: {
  //     handler() {
  //       //
  //     }
  //   }
  // },
  methods: {
    onYearChange(e) {
      const year = e.currentTarget as HTMLSelectElement;
      this.currentDate.year = year.value;
      this.fixInvalidDate();
    },
    onMonthChange(e) {
      const month = e.currentTarget as HTMLSelectElement;
      this.currentDate.month = month.selectedIndex;
      this.fixInvalidDate();
    },
    onDayChange(e) {
      const day = e.currentTarget as HTMLSelectElement;
      this.currentDate.day = day.value;
      this.fixInvalidDate();
    },
    onTimeChange(e) {
      this.showTime = true;
      const timeValue = (this.isSafari as string)
        ? e.displayTime
        : e.currentTarget.value;
      if (timeValue) {
        if (!this.isSafari) {
          this.currentDate.time = timeValue;
          this.fixInvalidDate();
        } else {
          this.currentDate.time = timeValue;
          this.fixInvalidDate();
        }
      }
    },
    fixInvalidDate() {
      this.currentDate = fixDateIfInvalid(this.currentDate);
      // Also update days array based on month and year.
      this.days = getDaysInMonth(this.currentDate.year, this.currentDate.month);
      this.onDateChange();
    },
    toggleShowTime() {
      this.showTime = !this.showTime;
      this.onDateChange();
    },
    onDateChange() {
      const dateStr = formDateString(
        this.currentDate.day,
        this.currentDate.month,
        this.currentDate.year,
        this.currentDate.time
      );
      this.$emit("change", dateStr);
      this.$emit(
        "dateFormatted",
        formatDate(dateStr, this.showTime),
        this.showTime
      );
    }
  },
  mounted() {
    this.showTime = this.displayTime;
    this.currentDate = dateToDatePickerDate(this.date) as ICurrentDate;
    this.days = getDaysInMonth(this.currentDate.year, this.currentDate.month);
    this.safariDatePickerData = safariDatePickerData(this.date);
  }
});
</script>

<style scoped lang="scss">
#datepicker {
  display: grid;
  grid-template-columns: 1max-content 1max-content 1max-content;
  gap: 0px 10px;
  grid-template-areas: ". . .";
  select {
    appearance: none;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAoklEQVRIS+2T0Q2DMAxEHxt0kzICnRy6AWzCBqCriEQp5AwS6k/yEyWy79kXp+LmVd2sTwFYh4tFly3qgQl4AaNReQDtEqf4r3X0BgI8Ae05SBKvgTfQRAFK7AxkLT4s4j/d5qYoBwmJqxs3pnsQ5clz2XJYebLKARS3heguJB7pIBWyhujOVn6mgy1EZ02LG99PXsQi+5lyAQVg7SsW/d+iGc1WJBlqBe+5AAAAAElFTkSuQmCC)
      no-repeat 93%;
    background-size: 18px;
    background-color: #f5f5f5;
  }
}

#timepicker {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: ". .";
  gap: 0px 10px;
  margin-top: 10px;
  #display-time {
    width: 100%;
    display: flex;
    padding: 0.65em;
    background-color: whitesmoke;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    user-select: none;
    label {
      margin: 0;
      font-weight: 500;
      color: black;
      cursor: pointer;
    }
    input {
      cursor: pointer;
    }
  }
}
</style>
