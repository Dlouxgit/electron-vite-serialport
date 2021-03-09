import { defineComponent, inject, reactive } from 'vue'

export default defineComponent({
  setup() {
    const ipc = inject('ipc')
    let state = reactive({
      rfid: '321',
      rfid2: '',
      rfidList: []
    })
    const changeLamp: (type: string) => void = (type) => {
      ipc.send('lampChange', type)
    }
    ipc.on('rfid', (event, arg) => {
      console.log(arg)
      console.log('渲染进程')
      // rfid = Array.from(arg)
      state.rfid = arg
      const status = state.rfidList.findIndex(item => item.rfid === arg)
      console.log('status', status)
      if (status === -1) {
        state.rfidList.push({
          rfid: arg
        })
        // console.log('state.rfidList')
        // console.log(state.rfidList)
        // console.log(state.rfidList[0])
      }
    })
    return () => (
      <>
        <router-link to="/">
          <el-button type="success">返回首页</el-button>
        </router-link>
        <el-button
          type="success"
          onClick={() => {
            changeLamp()
          }}
        >
          开灯(红绿交替){state.rfid}
        </el-button>
        <el-button
          type="success"
          onClick={() => {
            changeLamp('close')
          }}
        >
          关灯{state.rfid2}
        </el-button>
        <el-table
          data={state.rfidList}
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
            prop="rfid"
            label="rfid"
            width="180">
          </el-table-column>
        </el-table>
      </>
    )
  },
})
