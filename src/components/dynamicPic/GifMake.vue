<template>
  <div className="makeGif" style="display: table;flex: auto">
    <div id="gif"></div>
    <div id="lit"></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      gifWidth: 100, // GIF宽度
      gifHeight: 100, // GIF高度
      gitTime: 0.5, //每帧捕获之间等待的时间（以秒为单位）
    };
  },
  mounted() {
    const req = require.context('@/assets/test', true, /\.png$/)
    let images = req.keys().map(item => req(item))
    this.createGIF(images, 'gif');
    const reqLit = require.context('@/assets/lite', true, /\.png$/)
    let imagesLit = reqLit.keys().map(item => reqLit(item))
    this.createGIF(imagesLit, 'lit');
  },
  methods: {
    createGIF(images, eleId) {
      gifshot.createGIF(
          {
            gifWidth: this.gifWidth, // GIF宽度
            gifHeight: this.gifHeight, // GIF高度
            images: images, // 需要的图片数组
            interval: this.gitTime, // 每帧捕获之间等待的时间（以秒为单位）
            numFrames: 100, // 用于创建GIF的帧数
            frameDuration: 3, // 每帧停留的时间（10=1s）
            fontWeight: "normal", // 覆盖动画GIF的文本字体粗细
            fontSize: "16px", // 覆盖动画GIF的文本字体大小
            fontFamily: "sans-serif", // 字体类型
            fontColor: "#ffffff", // 字体颜色
            textAlign: "center", // 文本的水平对齐方式
            textBaseline: "bottom", // 文本的垂直对齐方式
            sampleInterval: 10, // 创建调色板时要跳过多少像素。默认值为10。“少”为佳，但较慢。
            numWorkers: 2, // 要使用多少个网络工作者来处理GIF动画帧。默认值为2。
          },
          function (obj) {
            if (!obj.error) {
              var image = obj.image,
                  animatedImage = document.createElement("img");
              animatedImage.src = image;
              document.getElementById(eleId).appendChild(animatedImage);
            }
          }
      );
    },
  },
};
</script>

<style scoped>
.makeGif {
  width: 30%;
  height: 30%;
}
</style>