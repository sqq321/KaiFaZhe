<template>
  <div class="CreateProfile">
    <div class="create-profile">
      <div class="container">
        <div class="row">
          <div class="col-md-8 m-auto">
            <a @click.prevent="$router.go(-1)" class="btn btn-light">返回</a>
            <h1 class="display-4 text-center">编辑个人信息</h1>
            <p class="lead text-center">写一些有关于你的个人信息</p>
            <small class="d-block pb-3">* = 必填</small>
            <form action="add-experience.html">
              <TextFieldGroup
                v-model="msgInfo.handle"
                placeholder="* Profile handle"
                name="handle"
                info="有关于你的个人信息"
                :error="errors.handle"
              />

              <SelectListGroup
                name="status"
                :error="errors.status"
                v-model="msgInfo.status"
                info="请选择您的职业"
                :options="options"
              />
              <TextFieldGroup
                v-model="msgInfo.company"
                placeholder="公司"
                name="company"
                info="公司"
                :error="errors.company"
              />

              <TextFieldGroup
                v-model="msgInfo.website"
                placeholder="网址"
                name="website"
                info="网址"
                :error="errors.website"
              />

              <TextFieldGroup
                v-model="msgInfo.location"
                placeholder="地点"
                name="location"
                info="地点"
                :error="errors.location"
              />

              <TextFieldGroup
                v-model="msgInfo.skills"
                placeholder="技能"
                name="skills"
                info="技能( HTML,CSS,JavaScript,PHP)"
                :error="errors.skills"
              />

              <TextFieldGroup
                v-model="msgInfo.githubusername"
                placeholder="Github 用户名"
                name="githubusername"
                info="Github 用户名"
                :error="errors.githubusername"
              />

              <TextAreaGroup
                placeholder="个人介绍"
                name="bio"
                v-model="msgInfo.bio"
                :error="errors.bio"
                info="自我介绍"
              />

              <div class="mb-3">
                <button
                  @click="displaySocialInputs = !displaySocialInputs"
                  type="button"
                  class="btn btn-light"
                >社交应用</button>
                <span class="text-muted">选项</span>
              </div>
              <div v-show="displaySocialInputs">
                <InputGroup
                  placeholder="QQ"
                  name="QQ"
                  v-model="msgInfo.QQ"
                  :error="errors.QQ"
                  icon="fa fa-qq"
                />

                <InputGroup
                  placeholder="微信公众号"
                  name="wechat"
                  v-model="msgInfo.wechat"
                  :error="errors.wechat"
                  icon="fa fa-weixin"
                />

                <InputGroup
                  placeholder="腾讯课堂网址"
                  name="tengxunkt"
                  v-model="msgInfo.tengxunkt"
                  :error="errors.tengxunkt"
                  icon="fa fa-weibo"
                />

                <InputGroup
                  placeholder="网易课堂网址"
                  name="wangyikt"
                  v-model="msgInfo.wangyikt"
                  :error="errors.wangyikt"
                  icon="fa fa-wechat"
                />
              </div>
              <input
                @click.prevent="handleSubmit"
                type="submit"
                class="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextFieldGroup from "../components/common/TextFieldGroup";
import InputGroup from "../components/common/InputGroup";
import SelectListGroup from "../components/common/SelectListGroup";
import TextAreaGroup from "../components/common/TextAreaGroup";

export default {
  name: "CreateProfile",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //vm.msgInfo = vm.$store.getters.profile;
      vm.getCurrentProfile();
    });
  },
  methods: {
    handleSubmit() {
      // console.log(this.msgInfo);
      // 发起请求
      this.$axios
        .post("/api/profile", this.msgInfo)
        .then(res => {
          console.log(res.data);
          this.errors = {};
          this.$store.dispatch("setProfileAsync", res.data);
          this.$router.push("/dashboard");
        })
        .catch(err => {
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });
    },
    getCurrentProfile() {
      const profile = this.$store.getters.profile;

      profile.company = profile.company ? profile.company : "";
      profile.website = profile.website ? profile.website : "";
      profile.location = profile.location ? profile.location : "";
      profile.githubusername = profile.githubusername
        ? profile.githubusername
        : "";
      profile.bio = profile.bio ? profile.bio : "";

      profile.social = profile.social ? profile.social : {};
      profile.QQ = profile.social.QQ ? profile.social.QQ : "";
      profile.wechat = profile.social.wechat ? profile.social.wechat : "";
      profile.tengxunkt = profile.social.tengxunkt
        ? profile.social.tengxunkt
        : "";
      profile.wangyikt = profile.social.wangyikt ? profile.social.wangyikt : "";

      profile.skills = profile.skills.length ? profile.skills.join(",") : "";

      this.msgInfo = profile;
    }
  },
  data() {
    return {
      msgInfo: {
        handle: "",
        company: "",
        website: "",
        location: "",
        skills: "",
        githubusername: "",
        name: "",
        status: " * 选择你的职业",
        bio: "",
        QQ: "",
        wechat: ""
      },
      errors: {},
      options: [
        { label: "0", value: "* 请选择您的职业" },
        { label: "Junior Developer", value: "前端初级工程师" },
        { label: "Senior Developer", value: "前端中级工程师" },
        { label: "HighDeveloper", value: "前端高级工程师" },
        { label: "Manager", value: "前端管理" },
        { label: "backend Developer", value: "后端开发" },
        { label: "Python machine learning", value: "Python机器学习" },
        { label: "Other", value: "其他" }
      ],
      displaySocialInputs: false
    };
  },
  components: {
    TextFieldGroup,
    InputGroup,
    SelectListGroup,
    TextAreaGroup
  }
};
</script>


<style scoped>
</style>