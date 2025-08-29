// 表单校验 + Loading
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var loading = document.getElementById('formLoading');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 原生校验 + 自定义提示
    if (!form.checkValidity()) {
      form.classList.add('was-validated'); // Bootstrap 样式配合
      // 聚焦第一个无效字段
      var firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // 显示 Loading
    loading && loading.classList.remove('d-none');

    // 模拟提交（你可以替换为真实 fetch）
    setTimeout(function(){
      loading && loading.classList.add('d-none');
      alert('Submitted (demo). Email saved to localStorage.');
      // form.reset(); // 需要的话清空
    }, 1200);
  });

  // 失焦即时校验（更友好）
  form.querySelectorAll('input, textarea').forEach(function(input){
    input.addEventListener('blur', function(){
      if (form.classList.contains('was-validated')) {
        input.checkValidity();
      }
    });
  });
});
