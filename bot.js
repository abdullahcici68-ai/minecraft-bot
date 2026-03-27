process.env.NODE_OPTIONS = '--max-old-space-size=256'
const mineflayer = require('mineflayer')

const HOST = 'Cicibaba38.aternos.me'
const PORT = 54194
const USERNAME = 'AFKBot'
const VERSION = '1.21.11'

const mesajlar = [
  'gg', 'hey', 'kim var?', 'ne yapıyorsunuz?',
  'bugün hava güzel', 'biri var mı?', 'eğlenceli bir gün',
  'naber', 'hay aksi', 'vay be', 'iyi oyunlar',
  'bu sunucu çok iyi', 'burda kimse yok mu',
  'yalnız kaldım :(', 'herkese merhaba!', 'bugün ne oynuyoruz'
]

function baslat() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION,
    auth: 'offline'
  })

  let hareketInterval = null
  let chatInterval = null

  bot.on('spawn', function() {
    console.log('BAĞLANDI!')

    hareketInterval = setInterval(function() {
      bot.setControlState('jump', true)
      setTimeout(function() { bot.setControlState('jump', false) }, 500)
      const yonler = ['forward', 'back', 'left', 'right']
      const yon = yonler[Math.floor(Math.random() * yonler.length)]
      bot.setControlState(yon, true)
      setTimeout(function() { bot.setControlState(yon, false) }, 1000)
    }, 5000)

    chatInterval = setInterval(function() {
      const rastgele = mesajlar[Math.floor(Math.random() * mesajlar.length)]
      bot.chat(rastgele)
    }, 600000)
  })

  bot.on('kicked', function(reason) {
    console.log('Atıldı: ' + reason)
    if (hareketInterval) clearInterval(hareketInterval)
    if (chatInterval) clearInterval(chatInterval)
    bot.end()
  })

  bot.on('error', function(err) {
    console.log('Hata: ' + err.message)
    if (hareketInterval) clearInterval(hareketInterval)
    if (chatInterval) clearInterval(chatInterval)
  })

  bot.on('end', function() {
    console.log('30 sn sonra tekrar bağlanıyor...')
    if (hareketInterval) clearInterval(hareketInterval)
    if (chatInterval) clearInterval(chatInterval)
    setTimeout(baslat, 30000)
  })
}

baslat()