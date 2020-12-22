<template>
  <v-card class="mx-auto" tile>
    <v-subheader>Saved Orders</v-subheader>
    <v-list-item-group color="primary">
      <v-list-item v-for="order in orders" :key="`${order.id}_${order.name}`">
        <v-list-item-content>
          <v-list-item-title>{{ order.name }}</v-list-item-title>
          <v-list-item-title>{{ order.phone }}</v-list-item-title>
          <v-list-item-title>{{ order.arrivalDate }}</v-list-item-title>
          <v-list-item-title>{{ order.airport }}</v-list-item-title>
          <v-list-item-title>{{ order.flightNumber }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-card>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>