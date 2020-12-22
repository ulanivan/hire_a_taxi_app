<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        :label="options.label"
        :hint="options.hint"
        persistent-hint
        :locale="options.locale"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker v-model="date" no-title @input="menu = false" />
  </v-menu>
</template>

<script>
export default {
  props: {
    formatDate: {
      type: Function,
    },
    options: {
      type: Object,
      default: () => ({
        locale: "en-gb",
        label: "Date of arrival",
        hint: "DD/MM/YYYY format",
      }),
    },
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
    };
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit("update", this.dateFormatted);
    },
  },
};
</script>

<style>
</style>