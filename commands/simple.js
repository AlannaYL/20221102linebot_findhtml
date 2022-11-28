import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/tems.js'
import writejson from '../untils/writejson.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://artemperor.tw/tidbits')
    const $ = cheerio.load(data)
    const bubble = JSON.parse(JSON.stringify(template))
    const Exhibitions = []
    let line = ''

    $('.list_box').each(function () {
      // console.log($(this).find('h2').text())
      if ($(this).find('h2').text().includes(event.message.text)) {
        // 抓圖
        bubble.hero.url = encodeURI($(this).find('.pic').attr('style').substring(21, 129).trim())
        bubble.body.contents[0].text = $(this).find('h2').text()
        bubble.footer.contents[0].action.uri = $(this).find('.tag a').attr('href')
        line = $(this).find('.tag a').attr('href')
      }
    })

    // 抓找到該展覽的網址頁面
    const { data: a } = await axios.get(line)
    const $$ = cheerio.load(a)
    // 抓該展覽的頁面網址資訊
    bubble.body.contents[1].contents[0].contents[1].text = $$('.exb_info').find('li').eq('1').find('p').text().trim()
    bubble.body.contents[1].contents[1].contents[1].text = $$('.exb_info').find('li').eq('0').find('p').text().substring(3, 26).trim()
    // console.log($$('.exb_info').find('li').eq('0').find('p').text().substring(3, 26).trim())
    Exhibitions.push(bubble)

    if (Exhibitions.length === 0) {
      event.reply('尋展覽中，請稍後試試看或更換關鍵字')
      return
    }
    const reply = {
      type: 'flex',
      altText: '展覽查詢結果',
      contents: {
        type: 'carousel',
        contents: Exhibitions
      }
    }
    event.reply(reply)
    if (process.env.WRITEJSON) {
      writejson(reply, 'simple')
    }
  } catch (error) {
    console.log(error)
    event.reply('尋找展覽中，請稍後試試看或更換關鍵字')
  }
}
