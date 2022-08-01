<template>
  <div>
    <SectionHeader>
        <v-icon class="ml-5" large>mdi-bell</v-icon>
        اعلانات
    </SectionHeader>
    <v-timeline dense>
        <v-timeline-item color="#0A8189" v-for="(item,index) in news" :key="index">
            <v-card class="item-card">
                <v-card-title>{{item.title}}</v-card-title>
                <v-card-text>{{item.body}}</v-card-text>
            </v-card>
        </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import SectionHeader from '../SectionHeader.vue'
export default {
    props: ["news"],
    data() {
        return {};
    },
    components: { SectionHeader }
}
</script>

<style lang="scss" scoped>
.item-card{
    width: fit-content;
    background-color: #0A8189;
}
</style>