import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/tem.js'
import writejson from '../untils/writejson.js'
import _ from 'lodash'

export default async (event) => {
  try {
    const { data } = await axios.get('https://artemperor.tw/tidbits')
    const $ = cheerio.load(data)
    const Exhibitions = []

    // 推送全部
    $('.list_box').each(function () {
      const bubble = JSON.parse(JSON.stringify(template))
      bubble.hero.url = encodeURI($(this).find('.pic').attr('style').substring(21, 129).trim())
      bubble.body.contents[0].text = $(this).find('h2').text().trim()
      bubble.hero.action.text = $(this).find('h2').text().trim()
      // bubble.body.contents[1].contents[0].contents[1].text = $(this).find('p').text().substring(3, 26).trim()
      // bubble.footer.contents[0].action.uri = $(this).find('.tag a').attr('href')
      Exhibitions.push(bubble)
      console.log(bubble)
    })

    const replies = _.chunk(Exhibitions, 12).map(bubbles => {
      return {
        type: 'flex',
        altText: '展覽查詢結果',
        contents: {
          type: 'carousel',
          contents: bubbles
        }
      }
    })
    event.reply(replies)
    if (process.env.WRITEJSON) {
      for (const i in replies) {
        writejson(replies[i], `Exhibition${i}`)
      }
    }
  } catch (error) {
    console.log(error)
    event.reply('尋找資料中，請稍後試試看')
  }
}
