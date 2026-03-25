process.env.NODE_OPTIONS = '--max-old-space-size=256'
const mineflayer = require('mineflayer')

const HOST = 'Cicibaba38.aternos.me'
const PORT = 54194
const USERNAME = 'AFKBot'
const VERSION = '1.21.11'

function baslat() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION,
    auth: 'offline'
  })

  let hareketInterval = null

  bot.on('spawn', function() {
    console.log('BAĞLANDI!')
    hareketInterval = setInterval(function() {
      bot.setControlState('jump', true)
      setTimeout(function() {
        bot.setControlState('jump', false)
      }, 500)
    }, 30000)
  })

  bot.on('kicked', function(reason) {
    console.log('Atıldı: ' + reason)
    if (hareketInterval) clearInterval(hareketInterval)
    bot.end()
  })

  bot.on('error', function(err) {
    console.log('Hata: ' + err.message)
    if (hareketInterval) clearInterval(hareketInterval)
  })

  bot.on('end', function() {
    console.log('Bağlantı kesildi, 60 sn sonra tekrar denenecek...')
    if (hareketInterval) clearInterval(hareketInterval)
    setTimeout(baslat, 60000)
  })
}

baslat()