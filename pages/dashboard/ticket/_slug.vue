<template>
  <v-container>

    <div class="mt-8 px-8" style="display: flex; justify-content: space-between">
      <div class="text-h5">درخواست پشتیبانی</div>
      <v-btn color="primary" class="v-btn--primary px-8" to="/dashboard/ticket/">
        سوال بپرسید
      </v-btn>
    </div>

    <SectionContainer style="background-color: #1f2f43; border-radius: 30px;"
                      class="pa-4 pl-6 ma-auto mt-8 shadow ">
      <div style="display: flex; justify-content:space-between;" class="ma-auto">
        <div class="pr-12">
          <h2>
            {{ data.title }}
          </h2>
        </div>
        <div>
          <v-chip outlined>
            {{ this.tags.data.find(x => x.id === data.tag).title }}
          </v-chip>
        </div>
      </div>
      <v-divider class="my-6 mx-auto"></v-divider>
      <div>
        <v-timeline dense align-top>
          <v-timeline-item>
            <v-avatar slot="icon">
              <img :src="data.author.profile.image_link ? data.author.profile.image_link : '/_nuxt/f8ea7db09a6600d23e2c20104c4d8389.svg' "/>
            </v-avatar>
            <div class="repliy-bg-color pa-3">
              <Preview :comment="data.text"/>
            </div>
          </v-timeline-item>

          <v-timeline-item v-for="(reply, index) in data.replies" :key="index">
            <template v-slot:icon>
              <v-avatar>
                <img v-if="data.author.email === reply.user.email" :src="reply.user.profile.image_link? reply.user.profile.image_link: '/_nuxt/f8ea7db09a6600d23e2c20104c4d8389.svg'"/>
                <img v-else src="~/assets/images/logo/AI_box_logo_without_shadow.svg"/>
              </v-avatar>
            </template>
            <div class="repliy-bg-color pa-3">
              <Preview :comment="reply.text"/>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <v-avatar slot="icon">
              <img :src="data.author.profile.image_link? data.author.profile.image_link:'/_nuxt/f8ea7db09a6600d23e2c20104c4d8389.svg' "/>
            </v-avatar>
            <div>
              <v-form class="pa-2" ref="form" lazy-validation>
                <!-- <v-textarea
                  v-model="text"
                  :counter="500"
                  :rules="[v => !!v || 'شرح نمی تواند خالی باشد!']"
                  label="نظر"
                  required
                  outlined
                ></v-textarea> -->

                <Editor class="repliy-bg-color" style="color: white" @update="updateText"/>

                <div style="display: flex; justify-content: flex-start;" class="mt-4">
                  <div style="max-width: 200px; width: 100%">
                    <v-btn block color="primary" class="v-btn--primary" @click="sendReplay(data.id, text)">
                      ارسال پاسخ
                    </v-btn>
                  </div>
                </div>
              </v-form>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </SectionContainer>
  </v-container>

</template>

<script>
import Preview from '~/components/editor/Preview';
import Editor from '~/components/editor/Editor';
import SectionContainer from '~/components/SectionContainer';

export default {
  layout: 'dashboard',
  components: {Preview, Editor, SectionContainer},
  async asyncData({route, $axios}) {
    var slug = route.params.slug;
    let res = await $axios.$get(`communication/${slug}`);
    let tags = await $axios.$get(`communication/tags`);
    const {data, status_code} = res;
    return {data, status_code, tags};
  },
  data() {
    return {
      text: '',
      data: {},
      tags: [],
      status_code: 200,
    };
  },
  methods: {
    updateText(val) {
      this.text = val;
    },
    sendReplay(id, text) {
      this.$axios.$post(`communication/${id}/replies`, {text}).then(res => {
        this.$toast.success('نظر ارسال شد!');
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
        this.$axios.$get(`communication/${id}`).then(res => {
          this.data = res.data;
          this.status_code = res.status_code;
        });

      }).catch(reason => {
        this.$toast.error('مشکلی در ارسال پیش آمده است!');
      });
    },
  },
};
</script>

<style lang="scss">
@import 'assets/variables.scss';

.user-reply {
  color: red;
}

.admin-reply {
  color: green;
}

.tickets-countainer {
  margin-top: 80px;
}

.repliy-bg-color {
  background: map-get($material-dark-elevation-colors, '12') !important;
  border-radius: 15px;
}

.shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
