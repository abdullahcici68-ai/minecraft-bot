process.env.NODE_OPTIONS = '--max-old-space-size=256'
const mineflayer = require('mineflayer')
const aternos = require('node-aternos')

const ATERNOS_USER = 'cicibaba12'
const ATERNOS_PASS = 'Cicibaba38'
const ATERNOS_SERVER = 'Cicibaba38'

const HOST = 'Cicibaba38.aternos.me'
const PORT = 54194
const USERNAME = 'Ahmet_2648'
const VERSION = '1.21.11'

async function sunucuAc() {
  try {
    const client = aternos.createClient(ATERNOS_USER, ATERNOS_PASS)
    const servers = await client.getServers()
    const server = servers.find(s => s.address.includes(ATERNOS_SERVER))
    if (server) {
      await server.start()
      console.log('Sunucu açılıyor, 60 sn bekleniyor...')
      await new Promise(r => setTimeout(r, 60000))
    }
  } catch (e) {
    console.log('Aternos hatası: ' + e.message)
  }
}

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
      setTimeout(function() { bot.setControlState('jump', false) }, 500)
      const yonler = ['forward', 'back', 'left', 'right']
      const yon = yonler[Math.floor(Math.random() * yonler.length)]
      bot.setControlState(yon, true)
      setTimeout(function() { bot.setControlState(yon, false) }, 1000)
    }, 5000)
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

  bot.on('end', async function() {
    console.log('Bağlantı kesildi, sunucu açılıyor...')
    if (hareketInterval) clearInterval(hareketInterval)
    await sunucuAc()
    setTimeout(baslat, 30000)
  })
}

sunucuAc().then(() => baslat())