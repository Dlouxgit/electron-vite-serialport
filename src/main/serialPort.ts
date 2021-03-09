const SerialPort = require('serialport')

console.log('串口测试')

const rfidDevice = new SerialPort('COM4', {
  //波特率，可在设备管理器中对应端口的属性中查看
  baudRate : 57600,
  autoOpen:false
})

const weighingScale = new SerialPort('COM1', {
  //波特率，可在设备管理器中对应端口的属性中查看
  baudRate: 9600,
  autoOpen: false
})

weighingScale.open(function (err) {
  console.log('IsOpen', weighingScale.isOpen)
  console.log('err', err)
})

weighingScale.on('data',function (data) {
  console.log('weighingScale received: ', data.toString('base64'))
  const buffer = new Uint8Array(data)
  console.log(buffer)
  console.log(typeof buffer)
})
//错误监听
weighingScale.on('error',function (error) {
  console.log('error: '+error)
})


rfidDevice.open(function (err) {
  console.log('rfidDevice IsOpen:', rfidDevice.isOpen)
  console.log('err:',err)
  if(!err){
      // //16进制Buffer流
      // const buf1 = new Buffer('01050000ff008C3A', 'hex') //打开红灯
      // const buf11 = new Buffer('010500000000CDCA', 'hex') //关闭红灯
      // const buf2 = new Buffer('01050001f000D80A', 'hex') //打开黄灯
      // const buf21 = new Buffer('0105000100009C0A', 'hex') //关闭黄灯
      // const buf3 = new Buffer('01050002f000280A', 'hex') //打开绿灯
      // const buf31 = new Buffer('0105000200006C0A', 'hex') //关闭绿灯
      // const bufs = [buf1,buf2,buf3]
      // // const bufs = [buf11,buf21,buf31]
      // var i = 0
      // eachWrite(bufs[i])
      // function eachWrite(item) {
      //     console.log(item)
      //     console.log('\nstr', item.toString())
      //     // console.log('\nstr', typeof item.toString())
      //     rfidDevice.write(item, function (error, result) {
      //         i++
      //         if(i>=bufs.length)return
      //         //指令是一条一条下发的
      //         setTimeout(function () {
      //             eachWrite(bufs[i])
      //         },40)
      //     })
      // }
  }
})

// //指令监听
// rfidDevice.on('data',function (data) {
//   console.log('data received: ', data.toString('base64'))
//   const buffer = new Uint8Array(data)
//   console.log(buffer)
//   console.log(typeof buffer)
// })
// //错误监听
// rfidDevice.on('error',function (error) {
//   console.log('error: '+error)
// })

SerialPort.list().then(ports => {
  ports.forEach(function(port) {
    console.log(123)
    console.log(port.path);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
  console.log('end')
});

const signalLamp = new SerialPort('COM3', {
  //波特率，可在设备管理器中对应端口的属性中查看
  baudRate: 9600,
  autoOpen: false,
})

let lampStatus: string = ''

function lampClose(): void {
  signalLamp.write(Buffer.from('21', 'hex'), function () {})
  signalLamp.write(Buffer.from('22', 'hex'), function () {})
  signalLamp.write(Buffer.from('24', 'hex'), function () {})
}

function lampOpen(color: string): void {
  lampClose()
  switch (color) {
    case 'red':
      signalLamp.write(Buffer.from('11', 'hex'), function () {})
      lampStatus = 'red'
      break
    case 'yellow':
      signalLamp.write(Buffer.from('12', 'hex'), function () {})
      lampStatus = 'yellow'
      break
    case 'green':
      signalLamp.write(Buffer.from('14', 'hex'), function () {})
      lampStatus = 'green'
      break
  }
}

function lampNext(): void {
  if (lampStatus === 'red') {
    lampOpen('green')
  } else {
    lampOpen('red')
  }
}

signalLamp.open(function (err) {
  console.log('IsOpen:', signalLamp.isOpen)
  console.log('err:', err)
  if (!err) {
    // lampOpen('green')
  }
})

// //指令监听
// signalLamp.on('data', function (data) {
//   console.log('data received: ', data.toString('base64'))
//   const buffer = new Uint8Array(data)
//   console.log(buffer)
//   console.log(typeof buffer)
// })
// //错误监听
// signalLamp.on('error', function (error) {
//   console.log('error: ' + error)
// })
export default {
  rfidDevice,
  lampNext,
  lampClose,
}


// const dev1 = new SerialPort('COM1', {
//   //波特率，可在设备管理器中对应端口的属性中查看
//   baudRate: 9600,
//   autoOpen: false
// })

// const dev2 = new SerialPort('COM4', {
//   //波特率，可在设备管理器中对应端口的属性中查看
//   baudRate: 9600,
//   autoOpen: false
// })

// dev1.open(function () {
// console.log('dev1')
// dev1.write(Buffer.from('R', 'hex'), function () {})
// dev1.write(Buffer.from('R'), function () {})
// dev1.write(Buffer.from('R', 'ascii'), function () {})
// dev1.write(Buffer.from('R', 'utf8'), function () {})
// dev1.write(Buffer.from('R', 'utf16le'), function () {})
// dev1.write(Buffer.from('R', 'ucs2'), function () {})
// dev1.write(Buffer.from('R', 'latin1'), function () {})
// dev1.write(Buffer.from('R', 'binary'), function () {})
// dev1.write(Buffer.from('R', 'base64'), function () {})
// // dev1.write(Buffer.from('R', 'ascii'), function () {})
// // dev1.write(Buffer.from('R', 'ascii'), function () {})
// })

// dev2.open(function () {
// console.log('dev2')
// dev2.write(Buffer.from('R', 'hex'), function () {})
// dev2.write(Buffer.from('R'), function () {})
// dev2.write(Buffer.from('R', 'ascii'), function () {})
// dev2.write(Buffer.from('R', 'utf8'), function () {})
// dev2.write(Buffer.from('R', 'utf16le'), function () {})
// dev2.write(Buffer.from('R', 'ucs2'), function () {})
// dev2.write(Buffer.from('R', 'latin1'), function () {})
// dev2.write(Buffer.from('R', 'binary'), function () {})
// dev2.write(Buffer.from('R', 'base64'), function () {})
// })

// dev1.on('data',function (data) {
// console.log('dev1 received: ', data.toString('base64'))
// const buffer = new Uint8Array(data)
// console.log(buffer)
// console.log(typeof buffer)
// })
// dev2.on('data',function (data) {
// console.log('dev2 received: ', data.toString('base64'))
// const buffer = new Uint8Array(data)
// console.log(buffer)
// console.log(typeof buffer)
// })