<template>
  <div class="register">
    <div class="register">
      <div class="container">
        <div class="row">
          <div class="col-md-8 m-auto">
            <h1 class="display-4 text-center">注册</h1>
            <p class="lead text-center">创建一个新的账号</p>
            <form @submit.prevent="handleSubmit" autocomplete="off" method="post">
              <!-- <div class="form-group">
                <input
                  v-model="newUser.name"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  required
                  :class="{'is-invalid':errors.name}"
                />
                <div v-if="errors.name" class="invalid-feedback">{{errors.name}}</div>
              </div>-->
              <TextFieldGroup
                v-model="newUser.name"
                type="name"
                placeholder="Name"
                name="name"
                :error="errors.name"
              />
              <!-- 封装组件 -->
              <TextFieldGroup
                v-model="newUser.email"
                type="email"
                placeholder="Email Address"
                name="email"
                info=" This site uses Gravatar so if you want a profile image, use a
              Gravatar email"
                :error="errors.email"
              />
              <TextFieldGroup
                v-model="newUser.password"
                type="password"
                placeholder="Password"
                name="password"
                :error="errors.password"
              />
              <TextFieldGroup
                v-model="newUser.password2"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                :error="errors.password2"
              />

              <input type="submit" class="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { maxHeaderSize } from "http";
import TextFieldGroup from "../components/common/TextFieldGroup";
export default {
  name: "register",
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: {}
    };
  },
  components: {
    TextFieldGroup
  },
  methods: {
    handleSubmit() {
      // console.log(this.newUser);
      this.$axios
        .post("api/users/register", this.newUser)
        .then(res => {
          this.errors = {};
          this.$router.push("/login");
          // this.$router.push({ name: "login",params:{param:"helloworld"}});
          //this.$router.replace("/login");
          //this.$router.replace({name:"login",params:{param:"helloworld"}})
          // this.$router.go(-1)
        })
        .catch(err => {
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });

      //同源策略
      /* http://localhost:8080/
       * 1.请求头 http://  https://  file://
       * 2.域名   localhost / 127.0.0.1 /wwww.baidu.com
       *3.端口号 :8080 / :8081 / :5000
        
       *http://wwww.baidu.com:2042
       *http://wwww.baidu.com:2041  不同源 ，这三个全部一致就叫同源，只要不同源就是跨域
        */
    }
  }
};
</script>


<style scoped>
</style>
