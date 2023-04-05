<template>
  <div className="makeGif">
    <div id="gif"></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      imgsList: [
        require("@/assets/logo.png"),
        require("@/assets/close.jpeg"),
      ],
      gifWidth: 100, // GIF宽度
      gifHeight: 100, // GIF高度
      gitTime: 0.5, //每帧捕获之间等待的时间（以秒为单位）
    };
  },
  created() {
    this.createGIF();
  },
  methods: {
    createGIF() {
      gifshot.createGIF(
          {
            gifWidth: this.gifWidth, // GIF宽度
            gifHeight: this.gifHeight, // GIF高度
            images: this.imgsList, // 需要的图片数组
            interval: this.gitTime, // 每帧捕获之间等待的时间（以秒为单位）
            numFrames: 100, // 用于创建GIF的帧数
            frameDuration: 1, // 每帧停留的时间（10=1s）
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
              document.getElementById("gif").appendChild(animatedImage);
            }
          }
      );
    },
  },
};
</script>

<style scoped>
.makeGif {
  width: 10%;
  height: 10%;
}
</style>