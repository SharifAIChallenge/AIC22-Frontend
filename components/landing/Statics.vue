<template>
  <v-container
    class="my-5"
    v-intersect="{
      handler: onIntersecAbout,
      options: {
        threshold: 0.3,
      },
    }">
    <box>
      <div class="pa-8">
<!--        <v-row>-->
<!--          <v-col class="col-12 col-md-3">-->
<!--            <v-card class="bg-transparent pa-4 bg-fix text-center" elevation="0"-->
<!--                    :style="{-->
<!--                    backgroundImage:`url(${Brackets})`-->
<!--            }"-->
<!--            >-->
<!--              <v-card-title class="justify-center text-h2">-->
<!--                1334-->
<!--              </v-card-title>-->
<!--              <v-card-text>-->
<!--                نبرد-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--          <v-col class="col-12 col-md-3">-->
<!--            <v-card class="bg-transparent pa-4 bg-fix text-center" elevation="0"-->
<!--                    :style="{backgroundImage:`url(${Team})`}">-->
<!--              <v-card-title class="justify-center text-h2">-->
<!--                1334-->
<!--              </v-card-title>-->
<!--              <v-card-text>-->
<!--                نبرد-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--          <v-col class="col-12 col-md-3">-->
<!--            <v-card class="bg-transparent pa-4 bg-fix text-center" elevation="0"-->
<!--                    :style="{backgroundImage:`url(${Swords})`}">-->
<!--              <v-card-title class="justify-center text-h2">-->
<!--                1334-->
<!--              </v-card-title>-->
<!--              <v-card-text>-->
<!--                نبرد-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--          <v-col class="col-12 col-md-3">-->
<!--            <v-card class="bg-transparent pa-4 bg-fix text-center" elevation="0"-->
<!--                    :style="{backgroundImage:`url(${Member})`}">-->
<!--              <v-card-title class="justify-center text-h2">-->
<!--                1334-->
<!--              </v-card-title>-->
<!--              <v-card-text>-->
<!--                نبرد-->
<!--              </v-card-text>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--        </v-row>-->
        <v-row class="justify-center">
          <v-col class="col-12 col-md-3">
            <v-card class="bg-transparent pa-4 bg-fix text-center" elevation="0"
                    :style="{backgroundImage:`url(${Member})`}">
              <v-card-title class="justify-center text-h2">
                {{ registerNumber }}
              </v-card-title>
              <v-card-text>
                تعداد ثبت نام
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </box>
  </v-container>

</template>

<script>
import Box from "~/components/utilities/Box";
import Brackets from "~/assets/images/brackets.svg";
import Swords from "~/assets/images/swords.svg";
import Member from "~/assets/images/member.svg";
import Team from "~/assets/images/team.svg";

export default {
  name: "Statics",
  props: {
    onIntersecAbout: Function
  },
  stats : [],
  data() {
    return {
      Brackets,
      Swords,
      Member,
      Team,
      registerNumber : 0,
    };
  },
  async fetch(){
    this.stats = await this.$axios.$get('statistic/')
    this.registerNumber = this.stats[0].value
  },
  components: { Box }
};
</script>

<style scoped>
.bg-transparent {
  background-color: transparent;
}

.bg-fix {
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>