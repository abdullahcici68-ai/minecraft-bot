const mineflayer = require('mineflayer')

const HOST = 'Cicibaba38.aternos.me'
const PORT = 54194
const USERNAME = 'AFKBot'
const VERSION = '1.21.11'

let yenidenBaglanSayaci = 0

function baslat() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION,
    auth: 'offline'
  })

  bot.on('spawn', function() {
    console.log('BAĞLANDI! AFK başladı.')
    setInterval(function() {
      bot.setControlState('jump', true)
      setTimeout(function() {
        bot.setControlState('jump', false)
      }, 500)
      console.log('Hareket yapıldı')
    }, 30000)
  })

  bot.on('kicked', function(reason) {
    console.log('Atıldı: ' + reason)
    yenidenBaglan()
  })

  bot.on('error', function(err) {
    console.log('Hata: ' + err.message)
    yenidenBaglan()
  })

  bot.on('end', function() {
    console.log('Bağlantı kesildi')
    yenidenBaglan()
  })
}

function yenidenBaglan() {
  yenidenBaglanSayaci++
  console.log(yenidenBaglanSayaci + '. deneme - 5 sn sonra bağlanıyor...')
  setTimeout(baslat, 15000)
}

baslat()