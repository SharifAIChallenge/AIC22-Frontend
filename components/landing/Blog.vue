<template>
  <div class="my-14 py-14">
    <TitleContainer title="آخرین اخبار"/>
    <v-container class="my-16">
      <box>
        <div class="pa-4 pa-sm-8 pa-md-14">
          <v-row>
            <v-col class="col-12 col-md-4">
              <Card
                  title="افتتاحیه"
                  description="یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد یه سری اخبار مربوط به رویداد "
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
import TitleContainer from '~/components/TitleContainer';

export default {
  name: "Blog",
  components: {TitleContainer, Card, Box}
}
</script>

<style scoped>

</style>