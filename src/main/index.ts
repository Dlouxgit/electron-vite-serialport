/**
 * electron 主文件
 */
import { join } from 'path'
import { Login, Main } from './window'
import { app } from 'electron'
import { User } from './interfaces/user'
import {
  LOGIN,
  LOGOUT,
  LOGIN_CLOSE,
  TOGGLE_DEVTOOLS
} from '@src/common/constant/event'
import store, { USER_INFO } from '@src/common/utils/store'


function init() {
  const loginWin = new Login()
  const mainWin = new Main()

  const mainOpen = () => {
    mainWin.open()
    const unsubscribeDevtool = mainWin.subscribe(TOGGLE_DEVTOOLS, win => {
      mainWin.win?.webContents.toggleDevTools()
    })
    const unsubscribeLogin = mainWin.subscribe(LOGOUT, win => {
      unsubscribeDevtool()
      unsubscribeLogin()
      mainWin.close()
      loginOpen()
    })
  }
  const loginOpen = () => {
    loginWin.open()
    const unsubscribeLogin = loginWin.subscribe(LOGIN, win => {
      // loginWin.win?.webContents.toggleDevTools() openDevTools 
      unsubscribeLogin()
      loginWin.close()
      mainOpen()
    })
    const unsubscribeClose = loginWin.subscribe(LOGIN_CLOSE, win => {
      unsubscribeClose()
      loginWin.close()
      app.exit(0)
    })
  }
  
  const user: User = (store.get(USER_INFO) ?? {}) as User
  
  console.log('user.token', user.token)
  if (user.token) {
    mainWin.open()
  } else {
    loginWin.open()
  }
}

app.whenReady().then(init)

// import { join } from 'path'
// import { app, BrowserWindow, ipcMain } from 'electron'
// import is_dev from 'electron-is-dev'
// import dotenv from 'dotenv'
// import Store from 'electron-store'
// import serialPort from './serialPort'
// const { rfidDevice, lampNext, lampClose } = serialPort

// const store = new Store()
// ipcMain.on('store:set', async (e, args) => {
//   store.set(args.key, args.value)
// })
// ipcMain.handle('store:get', async (e, args) => {
//   const value = await store.get(args)
//   return value
// })
// ipcMain.on('store:delete', async (e, args) => {
//   store.delete(args)
// })

// ipcMain.on('lampChange', (event, arg) => {
//   if (arg === 'close') {
//     lampClose()
//   } else {
//     lampNext()
//   }
//   event.reply('lampChangeStatus', 'success')
// })

// ipcMain.on('revice', (event, arg) => {
//   if (arg === 'close') {
//     lampClose()
//   } else {
//     lampNext()
//   }
//   event.reply('lampChangeStatus', 'success')
// })


// dotenv.config({ path: join(__dirname, '../../.env') })

// let win = null

// class createWin {
//   // 创建浏览器窗口
//   constructor () {
//     win = new BrowserWindow({
//       width: 330,
//       height: 700,
//       webPreferences: {
//         nodeIntegration: true,
//         enableRemoteModule: true,
//       },
//     })
  
//     const URL = is_dev
//       ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
//       : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址
  
//     win.loadURL(URL)
//   }
// }

// app.whenReady().then(() => new createWin())


// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     new createWin()
//   }
// })
// // const SerialPort = require('serialport')

// // SerialPort.list().then(ports => {
// //   ports.forEach(function(port) {
// //     console.log(123)
// //     console.log(port.path);
// //     console.log(port.pnpId);
// //     console.log(port.manufacturer);
// //   });
// //   console.log('end')
// // });

// rfidDevice.on('data',function (data) {
//   const res = data.toString('hex').slice(8, -4)
//   console.log('rfid received: ', data.toString('hex'))
//   win.webContents.send('rfid', res)
// })