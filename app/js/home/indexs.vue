<template>
    <div :class="$style.home">
        <h1>
            home
            <p :class="$style.title">
                title
            </p>
        </h1>
    </div>
</template>
<script>
export default {
  data () {
    return {
      a: '123'
    }
  },
  mounted () {
    console.log(this.$style)
  }
}
</script>
<style lang="scss" module>
    @import "../../css/reset.scss";
    .home {
        color: yellow;
        font-size: 80px;
        h1 {
           font-size: 200px;
         }
        .title {
            color: #174a79;
            font-size: 100px;
        }
    }
</style>
