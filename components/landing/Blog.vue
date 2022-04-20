<template>
  <div>
    <h3 class="text-h2 text-center">
      آخرین اخبار
    </h3>
    <v-container class="mt-16">
      <box>
        <div class="pa-14">
          <v-row>
            <v-col class="col-12 col-md-4">
              <Card
                  title="افتتاحیه"
                  description="یھ سری اخبار مروط بھ رویداد یھ سری اخبار مروط بھ رویداد یھ سری اخبار مروط ب"
                  date="فروردین"
                  href="https://google.com"
              />
            </v-col>
            <v-col class="col-12 col-md-4">
              <Card
                  title="افتتاحیه"
                  description="یھ سری اخبار مروط بھ رویداد یھ سری اخبار مروط بھ رویداد یھ سری اخبار مروط ب"
                  date="فروردین"
                  href="https://google.com"
              />
            </v-col>
            <v-col class="col-12 col-md-4">
              <Card
                  title="افتتاحیه"
                  description="یھ سری اخبار مروط بھ رویداد یھ سری اخبار مروط بھ رویداد یھ سری اخبار مروط ب"
                  date="فروردین"
                  href="https://google.com"
              />
            </v-col>
          </v-row>
          <div class="text-center mt-14">
            <v-btn
                color="primary"
                class="px-8"
                rounded
            >
              بیشتر...
            </v-btn>
          </div>

        </div>
      </box>
    </v-container>
  </div>
</template>

<script>
import Box from "~/components/utilities/Box";
import Card from "~/components/blog/Card";

export default {
  name: "Blog",
  components: {Card, Box}
}
</script>

<style scoped>

</style>