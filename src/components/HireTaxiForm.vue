<template>
  <div class="hire-taxi-form">
    <template v-if="processForm === 'filling'">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <ApolloMutation
          :mutation="require('../graphql/createOrder.gql')"
          :variables="{ order }"
          @done="submit"
          :update="updateCache"
        >
          <template v-slot="{ mutate, loading, error }">
            <p v-if="error">An error occurred: {{ error }}</p>

            <form @submit.prevent="mutate()">
              <validation-provider
                v-slot="{ errors }"
                name="name"
                rules="required"
              >
                <v-text-field
                  v-model="name"
                  :error-messages="errors"
                  label="Your full name"
                  required
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="phone number"
                :rules="phoneValidateRules"
              >
                <v-text-field
                  v-model.trim="phoneNumber"
                  :error-messages="errors"
                  label="Your mobile phone"
                  required
                ></v-text-field>
              </validation-provider>
              <DatePicker
                :formatDate="formatBritishDate"
                @update="(date) => (arrivalDate = date)"
              />

              <validation-provider
                v-slot="{ errors }"
                name="airport"
                rules="required"
              >
                <v-select
                  v-model="airport"
                  :items="airportItems"
                  :error-messages="errors"
                  label="Airport"
                  data-vv-name="Airport"
                  required
                ></v-select>
              </validation-provider>
              <v-select
                v-if="airport === 'Heathrow'"
                v-model="heathrowTerminal"
                :items="terminalItems"
                label="Terminal"
                required
              />
              <validation-provider
                v-slot="{ errors }"
                name="airflight number"
                :rules="airflightNumberRules"
              >
                <v-text-field
                  v-model="airflightNumber"
                  :error-messages="errors"
                  label="Airflight number"
                  required
                ></v-text-field>
              </validation-provider>

              <v-btn
                block
                color="accent"
                class="mt-2"
                type="submit"
                :disabled="invalid"
                :loading="loading"
              >
                submit
              </v-btn>
            </form>
          </template>
        </ApolloMutation>
      </validation-observer>
    </template>
    <template v-else>
      <Popup @close="closePopup" :dialog="processForm === 'sent'" />
    </template>
  </div>
</template>

<script>
import Popup from "./Popup";
import DatePicker from "./DatePicker";
import { required, regex } from "vee-validate/dist/rules";
import gql from "graphql-tag";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("regex", {
  ...regex,
  message: "Invalid {_field_} number format",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Popup,
    DatePicker,
  },
  data: (vm) => ({
    name: "",
    phoneNumber: "",
    airport: null,
    airportItems: ["Heathrow", "Gatwick"],
    airflightNumber: "",
    heathrowTerminal: "not sure",
    terminalItems: ["1", "2", "3", "4", "not sure"],
    phoneValidateRules: {
      required: true,
      regex: "^(\\+44\\s?7\\d{3}|\\(?07\\d{3}\\)?)\\s?\\d{3}\\s?\\d{3}$",
    },
    airflightNumberRules: {
      required: true,
      regex: "(?<![\\dA-Z])(?!\\d{2})([A-Z\\d]{2})\\s?(\\d{2,4})(?!\\d)",
    },
    processForm: "filling",
    arrivalDate: vm.formatBritishDate(new Date().toISOString().substr(0, 10)),
  }),
  computed: {
    terminal() {
      const mapping = {
        Heathrow: this.heathrowTerminal,
      };
      return mapping[this.airport] || "";
    },
    order() {
      return {
        name: this.name,
        phone: this.phoneNumber,
        arrivalDate: this.arrivalDate,
        airport: `Airport: ${this.airport}, terminal: ${this.terminal}`,
        flightNumber: this.airflightNumber,
      };
    },
  },
  methods: {
    submit() {
      this.processForm = "sent";
      this.clear();
    },
    updateCache(_, { data: { createOrder } }) {
      const { id } = createOrder;
      this.$apollo.mutate({
        mutation: gql`
          mutation($order: InputOrder!) {
            addOrder(order: $order) @client {
              id
              name
              phone
            }
          }
        `,
        variables: {
          order: {
            id,
            ...this.order,
          },
        },
      });
    },
    formatBritishDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    closePopup() {
      this.processForm = "filling";
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.airflightNumber = "";
      this.airport = null;
      this.$refs.observer.reset();
    },
  },
};
</script>

<style>
</style>