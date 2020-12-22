<template>
  <v-dialog v-model="dialog" persistent max-width="330">
    <v-card>
      <v-card-title class="headline">The order has been sent.</v-card-title>
      <v-card-text>Have a nice trip!</v-card-text>
      <v-card-text
        ><a target="_blank" href="https://unbiased.co.uk"
          >unbiased.co.uk</a
        ></v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close')">
          Close
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style>
</style>