<template>
  <div>
    <div class="mb-16">
      <TitleContainer title="جوایز"/>
    </div>
    <div class="flex justify-center row">
      <div class="prize">
        <span class="text-h3">4</span>
        <span class="text-h5">میلیون تومان</span>
        <span class=" prize__team">تیم سوم</span>
      </div>
      <div class="prize first--prize">
        <span class="text-h2 font-weight-bold">12</span>
        <span class="text-h5">میلیون تومان</span>
        <span class=" prize__team">تیم اول</span>
      </div>
      <div class="prize">
        <span class="text-h3">8</span>
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
            دو جایزه رندوم برای تیم‌های چهارم تا بیستم
            <br/>
            دو جایزه  ویژه برای مینی‌گیم‌ها
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
}

@media screen and (max-width: 980px) {
  .first--prize {
    transform: translateY(0px);
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
    border: gold solid 3px;
    margin: 20px 0;
    padding: 5px 20px;
    border-radius: 30px;
  }

}

</style>