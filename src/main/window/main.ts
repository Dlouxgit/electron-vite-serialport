import { withScopeId } from '@vue/runtime-core'
import { BrowserWindow } from 'electron'
import { WinSubscribe, EventCallback, getLoadURL, options } from './utils'

export class Main extends WinSubscribe {
  public static events: Record<string, Array<EventCallback>> = {}
  
  public win: BrowserWindow | null = null

  public url: string = getLoadURL()

  constructor(private opts?: Electron.BrowserWindowConstructorOptions) {
    super(Main.events)
  }
  
  public open() {
    this.win = new BrowserWindow({
      ...options,
      // title: 'serialport',
      ...this.opts
    })
    this.win.loadURL(this.url)
    this.win.center()
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