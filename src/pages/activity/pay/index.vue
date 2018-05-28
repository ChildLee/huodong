<template>
  <main>
    <div style="text-align: center;margin-top: 15%;">
      <img src="/static/img/pay.png" mode="widthFix" style="width: 50%;">
    </div>
    <div class="prompt-box">
      <div class="prompt-1">请截屏后用微信识别本二维码进行支付</div>
      <div class="prompt-2">或用另一部手机扫描支付</div>
      <div class="prompt-3 ">
        <div style="margin-bottom: 10px;">特别注意：</div>
        因本小程序人数众多，支付时请务必备注与您注册时一致的手机号码，如忘记备注请前往个人中心加平台客服微信并提供付款截屏以找回记录
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'pay'
  }
</script>

<style>
  .prompt-box {
    padding: 10px 50px;
  }

  .prompt-1 {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
  }

  .prompt-2 {
    color: #999;
    margin: 10px 0;
    font-size: 14px;
    text-align: center;
  }

  .prompt-3 {
    padding-top: 20px;
    font-size: 14px;
    color: red;
  }
</style>
