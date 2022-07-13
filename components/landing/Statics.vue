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
                    :style="{backgroundImage:`url(${user})`}">
              <v-card-title class="justify-center text-h2">
                {{registerNumber}}
              </v-card-title>
              <v-card-text>
                تعداد ثبت نام
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="col-12 col-md-3">
            <v-card class="bg-transparent pa-4 bg-fix text-center" elevation="0"
                    :style="{backgroundImage:`url(${team})`}">
              <v-card-title class="justify-center text-h2">
                {{ teamNumber }}
              </v-card-title>
              <v-card-text>
                تعداد تیم
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
import submit from "~/assets/images/brackets.svg";
import game from "~/assets/images/swords.svg";
import user from "~/assets/images/member.svg";
import team from "~/assets/images/team.svg";

export default {
  name: "Statics",
  props: {
    onIntersecAbout: Function
  },
  
  stats : [],
  data() {
    return {
      submit,
      game,
      user,
      team,
      teamNumber : 0,
      registerNumber : 0
    };
  },
  async fetch(){
    await this.$axios.$get('statistic/').then(res=>{
      console.log(res)
      this.teamNumber = res.find(item => item.title==='team').value
      this.registerNumber = res.find(item => item.title==='user').value
    })
  },
  components: { Box },
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