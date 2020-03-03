<template>
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="80px" style="width: 380px;">
        
        <el-form-item label="选择头像">
            <el-upload
                class="avatar-uploader"
                name="userheadpic"
                action="http://localhost:3000/fileupload.php"
                
                :with-credentials=true
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

        <el-form-item label="昵称" prop="username">
            <el-input type="text" placeholder="请输入昵称" v-model="userInfo.username"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="useremail">
            <el-input type="text" placeholder="请输入邮箱，邮箱将被用来登录" v-model="userInfo.useremail"/>
        </el-form-item>
        <el-form-item label="密码" prop="userpasswd">
            <el-input type="password" placeholder="如不修改密码，请输入原密码" v-model="userInfo.userpasswd" show-password/>
        </el-form-item>
        
        <el-form-item :label-width="formLabelWidth">
            <el-popover
                placement="right"
                width="160"
                trigger="click"
                v-model="popovervisible">
                <p>即将更新您的账号信息，要继续吗？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="popovervisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="updateUserInfo()">确定</el-button>
                </div>
                <el-button type="primary" icon="el-icon-upload" slot="reference" >修改资料</el-button>
            </el-popover>
        </el-form-item>

    </el-form>
</template>

<script>
    export default {
        data(){
            return {
                userInfo: {
                    userid: "", // user id
                    username: "BEATREE", // 用户昵称
                    headImg: "", // 用户头像
                    useremail: "",
                    userpasswd:""
                },
                formLabelWidth: '120px',
                imageUrl: '',
                popovervisible: false,  // 控制面板显示
                rules: {
                    uname: [
                        { required: true, message: '请输入新昵称', trigger: 'blur' },
                        { min: 1, message: '活动至少一个字符', trigger: 'blur' },
                    ],
                    uemail: [
                        {required: true, message: '邮箱不可为空', trigger: 'blur'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    upasswd: [
                        {required: true, message: '如不修改密码，请输入原密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            updateUserInfo() {
                this.axios.post('updateuser.php', this.userInfo).then( response => {
                    let res = response.data;
                    if(res.status === 1){
                        this.userInfo.userpasswd = '';
                        this.$store.commit('setUserInfo', this.userInfo);
                        this.$router.push('/admin/userinfo/'+this.userInfo.userid);
                        this.$message({
                            message: '账号信息修改成功',
                            type: 'success'
                        });
                    }else if(res.status === 0){
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('userinfo');
                        this.$router.push("/login")
                        this.$message({
                            message: '登录信息已过期！',
                            type: 'warning'
                        });
                    }else{
                        console.log(res)
                        this.$message({
                            message: '未检测到更新的信息',
                            type: 'warning'
                        });
                    }
                })
                this.popovervisible = false;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.userInfo.headImg = res.storepath;
                // console.log(res)
            },
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/gif');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            getUserInfo(){
                // this.userInfo = this.$store.getters.getUserInfo;
                // this.imageUrl = this.userInfo.headImg;
            },
            
        },
        created(){
          this.getUserInfo();
          
          
        },
        watch: {
          $route(newValue, oldValue) {
            this.addTodoForm = {             // 弹框表单内容
                  tname:'',
                  timportant: '',
                  tdeadline:'',
                  uid: '',
              };
            this.getListToDos();
          },
        },
        
    }
</script>

<style lang="sass" scoped>


</style>