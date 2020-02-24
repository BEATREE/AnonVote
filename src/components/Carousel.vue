<template>
  <el-carousel
    class="banner"
    :height="carouselHeight"
    :interval="4000"
    indicator-position="outside"
  >
    <el-carousel-item
      class="banner-item"
      v-for="poster in posters"
      :key="poster.id"
    >
      <img
        :src="poster.img"
        style="width: 100%; height: 100%; z-index: -1;"
        alt=""
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      posters: [
        { id: 0, img: require('@/assets/img/banner1.jpg') },
        { id: 1, img: require('@/assets/img/banner2.jpg') },
      ],
      carouselHeight: '400px',
    }
  },
  mounted() {
    const that = this
    // 判断是否是桌面环境，如果不是，初始化为200
    if (document.body.clientWidth < 970) {
      that.carouselHeight = '200px'
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        if (window.screenWidth < 970) {
          // 尺寸变小时候变为200px;
          that.carouselHeight = '200px'
        } else {
          // 变大时候，变为400px;
          that.carouselHeight = '400px'
        }
      })()
    }
  },
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
