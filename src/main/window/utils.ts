import is_dev from 'electron-is-dev'
import { join } from 'path'
import { 
  BrowserWindow, 
  ipcMain, 
  // app
 } from 'electron'

export function getLoadURL() {
  // return app.isPackaged === true ?
  return is_dev
  ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
  : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址
}

export const options: Electron.BrowserWindowConstructorOptions = {
  width: 1024,
  height: 768,
  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true,
    // preload: join(__dirname, '../../src/preload/index.js'),
  },
  ...(is_dev
    ? { /* prod */ }
    : { /* dev */ }
    )
}

export type EventCallback = (win: BrowserWindow | null) => void

export class WinSubscribe {
  constructor(protected events: Record<string, Array<EventCallback>>) { }
  // 把事件注册到自定义的事件池中
  public subscribe(name: string, cb: EventCallback) {
    this.regHandle(name, cb)
    if (!Array.isArray(this.events[name])) {
      this.events[name] = []
    }
    this.events[name].push(cb)
    // 返回一个从事件池移除事件的方法，直接调用即可
    return () => this.unsubscribe(name, cb)
  }
  // 移除事件
  public unsubscribe(name: string, cb: EventCallback) {
    if (!Array.isArray(this.events[name])) {
      return
    }
    this.events[name] = this.events[name].filter(_ => _ !== cb)
  }
  // 注册到 ipcMain.handle 上
  public regHandle(name: string, cb: EventCallback) {
    if (Array.isArray(this.events[name])) { return } // 用事件池判断是否添加 event
    ipcMain.handle(name, async () => {
      if (!Array.isArray(this.events[name])) { return }
      this.events[name].forEach(() => {
        cb(null)
      })
    })
  }
}