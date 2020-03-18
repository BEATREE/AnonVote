<template>
  <el-form
    :model="userInfo"
    :rules="rules"
    ref="userInfo"
    label-width="80px"
    style="width: 380px;"
  >
    <el-form-item label="选择头像">
      <el-upload
        class="avatar-uploader"
        name="userheadpic"
        action="http://localhost:8088/api/upload/img"
        :with-credentials="true"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="昵称" prop="uname">
      <el-input type="text" placeholder="请输入昵称" v-model="userInfo.uname" />
    </el-form-item>
    <el-form-item label="邮箱" prop="uemail">
      <el-input
        type="text"
        placeholder="请输入邮箱，邮箱将被用来登录"
        v-model="userInfo.uemail"
      />
    </el-form-item>
    <el-form-item label="密码" prop="upassword">
      <el-input
        type="password"
        placeholder="如不修改密码，请输入原密码"
        v-model="userInfo.upassword"
        show-password
      />
    </el-form-item>

    <el-form-item :label-width="formLabelWidth">
      <el-popover
        placement="right"
        width="160"
        trigger="click"
        v-model="popovervisible"
      >
        <p>即将更新您的账号信息，要继续吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="popovervisible = false">
            取消
          </el-button>
          <el-button type="primary" size="mini" @click="updateUserInfo()">
            确定
          </el-button>
        </div>
        <el-button type="primary" icon="el-icon-upload" slot="reference">
          修改资料
        </el-button>
      </el-popover>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      formLabelWidth: '120px',
      imageUrl: '',
      popovervisible: false, // 控制面板显示
      rules: {
        uname: [
          { required: true, message: '请输入新昵称', trigger: 'blur' },
          { min: 1, message: '活动至少一个字符', trigger: 'blur' },
        ],
        uemail: [
          { required: true, message: '邮箱不可为空', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  methods: {
    updateUserInfo() {
        // 隐藏小面板
      this.popovervisible = false;
      let message = ''
      let typeInfo = 'warning'
      this.axios
        .post('user/updateprofile', this.userInfo, {
          headers: {
            token: this.userInfo.token,
          },
        })
        .then(response => {
          var res = response.data
          message = res.message
          if (res.status == 1) {
            // 成功
            this.userInfo = res.data
            this.userInfo['token'] = res.token;
            this.$store.commit('setAdminInfo', this.userInfo);
            typeInfo = 'success'
          }

          this.$message({
            message: message,
            type: typeInfo,
          })
        })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.userInfo.uhead = res.storepath
      // console.log(res)
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getUserInfo() {
      this.userInfo = this.$store.getters.getAdminInfo
      this.imageUrl = this.userInfo.uhead
    },
  },
  created() {
    this.getUserInfo()
  },
  watch: {},
}
</script>

<style lang="sass" scoped></style>
