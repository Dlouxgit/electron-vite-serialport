import { app, BrowserWindow } from 'electron'
import { EventCallback, getLoadURL, options, WinSubscribe } from './utils'

export class Login extends WinSubscribe {
  public static events: Record<string, Array<EventCallback>> = {}

  public win: BrowserWindow | null = null

  public url: string = getLoadURL()

  constructor(private opts?: Electron.BrowserViewConstructorOptions) {
    super(Login.events)
  }

  public open() {
    this.win = new BrowserWindow({
      ...options,
      title: '登录',
      ...this.opts,
      // width: 540,
      // height: 390,
      // resizable: false,
      // frame: !app.isPackaged
    })
    console.log('this.url', `${this.url}/login`)
    this.win.loadURL(`${this.url}/login`) // 这里使用 hash 模式，确保打包后正常加载

  }

  public close() {
    if (!this.win) {
      return
    }
    if (this.win.isClosable()) {
      this.win.close()
      this.win = null
    }
  }
}