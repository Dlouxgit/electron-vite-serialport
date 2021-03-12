<template>
  <el-row>
    <el-col class="draggableArea" :span="24">
      <el-row>
        <el-col :span="2" :offset="22">
          <i @click="closeWin" class="el-icon-close NodraggingArea"></i>
        </el-col>
      </el-row>
    </el-col>
    <el-col class="NodraggingArea" :span="16" :offset="4">
      <img class="logo" src="@/assets/logo.png" alt="">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="" prop="pass">
          <el-input
            placeholder="请输入手机号"
            prefix-icon="el-icon-mobile-phone"
            v-model="mobile">
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input
            placeholder="请输入验证码"
            prefix-icon="el-icon-lock"
            v-model="code">
            <template #suffix>
              <!-- <div> -->
                <el-button v-if="countdown === 0" type="primary" @click="getCode">获取验证码</el-button>
                <el-button v-else disabled>{{countdown}}</el-button>
              <!-- </div> -->
            </template>
          </el-input>
        </el-form-item>
        <el-button class="login-btn">登录</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { LOGIN, LOGIN_CLOSE } from '@src/common/constant/event'

const { ipcRenderer } = require('electron')

export default defineComponent({
  setup () {
    
    const data = reactive({
      mobile: '',
      code: '',
      countdown: 0
    })

    const getCode = () => {
      let status = 'success'
      data.countdown = 60
      if (status === 'success') {
        const timer = setInterval(() => {
          data.countdown--
          if (data.countdown <= 0) {
            clearInterval(timer)
          }
        }, 1000)
      }
      console.log(data.mobile, data.code)
    }

    const closeWin = () => {
      data.countdown = 60
      console.log('closeWin')
      ipcRenderer.invoke(LOGIN_CLOSE)
    }

    return {
      ...toRefs(data),
      getCode,
      closeWin
    }
  }
})
</script>

<style scoped>
  :deep(.el-input__suffix) {
    right: 0;
  }

  .logo {
    width: 100px;
    height: 100px;
  }
  
  .login-btn {
    width: 100%;
  }

  .el-icon-close {
    font-size: 25px;
    z-index: 10;
    color: #ccc;
    cursor: pointer;
  }

  .draggableArea {
    -webkit-app-region: drag;
    padding-top: 10px;
  }

  .NodraggingArea {
    -webkit-app-region: no-drag;
  }
</style>