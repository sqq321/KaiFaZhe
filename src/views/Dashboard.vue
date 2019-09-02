<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">仪表盘</h1>
          <p v-if="user != null  && profile != null" class="lead text-muted">
            Welcome
            <router-link :to="{name:'profile',params:{handle:profile.handle}}">{{user.name}}</router-link>
          </p>
          <div v-if="profile">
            <ProfileActived />
            <!-- 个人工作经验和教育经历 -->
            <Experience @handleDashDelete="handleExpDelete" :experience="profile.experience" />
            <Education @handleEduDelete="handleEduDelete" :education="profile.education" />

            <!-- 删除 -->
            <div style="margin-bottom: 60px;">
              <button class="btn btn-danger" @click="deleteClick">删除当前账户</button>
            </div>
          </div>
          <div v-else>
            <p>没有任何您的个人信息，请添加！！！</p>
            <!-- 跳转到添加个人信息的组件中 -->
            <router-link to="/createprofile" class="btn btn-lg btn-info">添加个人信息</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileActived from "../components/common/ProfileActived";
import Experience from "../components/common/Experience";
import Education from "../components/common/Education";
export default {
  name: "dashboard",
  computed: mapGetters(["user"]),
  components: { ProfileActived, Experience, Education },
  data() {
    return {
      profile: null
    };
  },
  created() {
    this.getProfileData();
  },
  methods: {
    getProfileData() {
      this.$axios
        .get("/api/profile")
        .then(res => {
          //如果请求到数据，那么赋值给profile
          this.profile = res.data;

          //存到vuex
          this.$store.dispatch("setProfileAsync", res.data);
        })
        .catch(err => {
          this.$store.dispatch("setProfileAsync", null);
          this.profile = null;
        });
    },
    deleteClick() {
      this.$axios
        .delete("/api/profile")
        .then(res => {
          this.profile = null;

          this.$store.dispatch("setIsLoginAsync", false);
          this.$store.dispatch("setProfileAsync", null);
          this.$store.dispatch("setUserAsync", null);

          this.$router.push("/login");
        })
        .catch(err => {
          alert(err.response.data);
        });
    },
    handleExpDelete(id) {
      this.$axios.delete("/api/profile/experience/" + id).then(res => {
        this.profile = res.data;
      });
    },
    handleEduDelete(id) {
      this.$axios.delete("/api/profile/education/" + id).then(res => {
        this.profile = res.data;
      });
    }
  }
};
</script>


<style scoped>
</style>
