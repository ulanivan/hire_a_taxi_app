<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="6" sm="8" xs="12">
            <div class="d-flex justify-center">
              <h1>Hire a taxi</h1>
            </div>
            <HireTaxiForm class="mt-4" />
            <template v-if="orders.length > 0">
              <SavedOrdersList :orders="orders" class="mt-10" />
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HireTaxiForm from "./components/HireTaxiForm";
import SavedOrdersList from "./components/SavedOrdersList";
import { orderItemsQuery } from "./graphql/queries";

export default {
  name: "App",
  components: { HireTaxiForm, SavedOrdersList },
  apollo: {
    orders: {
      query: orderItemsQuery,
    },
  },
};
</script>