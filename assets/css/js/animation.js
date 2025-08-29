// AOS 初始化（全站通用）
document.addEventListener('DOMContentLoaded', function () {
  if (window.AOS) {
    AOS.init({
      once: true,        // 每个元素动画只触发一次
      offset: 80,        // 提前开始的距离
      duration: 600,     // 动画时长
      easing: 'ease-out' // 动画曲线
    });
  }
});
