<template>
  <div>
    <div class="mb-16">
      <TitleContainer title="جوایز"/>
    </div>
    <div class="flex justify-center row">
      <div class="prize third--prize">
        <span class="text-h3">10</span>
        <span class="text-h5">میلیون تومان</span>
        <span class=" prize__team">تیم سوم</span>
      </div>
      <div class="prize first--prize">
        <span class="text-h2 font-weight-bold">20</span>
        <span class="text-h5">میلیون تومان</span>
        <span class=" prize__team">تیم اول</span>
      </div>
      <div class="prize second--prize">
        <span class="text-h3 ">15</span>
        <span class="text-h5">میلیون تومان</span>
        <span class=" prize__team">تیم دوم</span>
      </div>
    </div>
    <div>
      <v-row justify="center" align-content="center" align="center">
        <div class="pa-12 other--prize">
          <v-icon
              size="80"

          >
            mdi-plus
          </v-icon>
        </div>
        <span class="text-h6 mx-8 text-center text-md-right">
            15 میلیون تومان
            جوایز مینی گیم، بات و رندوم
          </span>
      </v-row>
    </div>
  </div>

</template>

<script>
import TitleContainer from "~/components/TitleContainer";

export default {
  components: {TitleContainer},
  name: "Prize"
}
</script>

<style scoped lang="scss">

.prize_wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.first--prize {
  transform: translateY(-70px);
  .prize__team {
    border-color: #FFD700FF;
  }
}

@media screen and (max-width: 980px) {
  .first--prize {
    transform: translateY(0px);
    order: -2;
  }
  .second--prize{
    order: -1;
  }
}

.second--prize{
  .prize__team {
    border-color: #C0C0C0FF;
  }
}
.third--prize{
  .prize__team {
    border-color: #CD7F32;
  }
}


.other--prize {
  background-image: url("static/curve1.svg"), url("static/curve2.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 180px;
}

.prize {
  background-image: url("static/curve0.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 350px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 100px;

  img {
    position: absolute;
    width: 16rem;
    right: 40px;
  }

  &__team {
    border: solid 3px;
    margin: 20px 0;
    padding: 5px 20px;
    border-radius: 30px;
  }

}

</style>