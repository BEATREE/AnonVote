<template>
  <div class="about">
    <h1>AnonVote匿名投票系统</h1>
    <h2>技术简介</h2>
    <p>
      该投票系统基于同态加密中的Paillier算法构建，Paillier算法具有加法同态与数乘同态性质，在加密过后仍可以对密文进行相对应的运算，且在运算过程中参与运算的数据仍旧保持有加密状态，从而可以确保数据的运算安全性，避免在运算过程中造成数据泄露。同时，系统采用授权码参与方式，发起人通过添加投票人，系统将向投票参与者通过邮件发放授权码，每个授权码仅能参与一次投票，从而避免刷票行为发生，保证数据的纯净性。
    </p>
    <h2>项目简介</h2>
    <p>
      该投票系统由个人进行开发维护，系统依托于阿里云服务器运行，属于个人毕业设计项目。
    </p>
    <h2>关于开发者</h2>
    <el-form label-position="left" label-width="80px">
      <el-form-item label="姓名">
        肖尊严
      </el-form-item>
      <el-form-item label="个人博客">
        <a href="https://beatree.cn/" target="_blank">做棵大树</a>
      </el-form-item>
      <el-form-item label="Github">
        <a href="https://github.com/BEATREE" target="_blank">BEATREE</a>
      </el-form-item>
      <el-form-item label="邮箱联系">
        <a href="mailto:beatree@qq.com">beatree@qq.cn</a>
      </el-form-item>
    </el-form>

    <p>
      您在系统使用过程中有任何疑问，您可以直接邮件联系，您将会在第一时间获得解答，帮助您完成或完善投票！如果发现系统漏洞，欢迎您及时发送邮件通知，我将会在第一时间进行系统的维护。
    </p>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 760px){
 div.about{
   width: 80%;
 } 
}
.about {
  width: 60%;
  margin: 0 auto;
  font-size: 18px;
  h1 {
    text-align: center;
  }
  p {
    text-indent: 2em;
  }
}
.el-form{
  margin-left: 45px;
  .el-form-item{
    margin:0;
  }
}
</style>
