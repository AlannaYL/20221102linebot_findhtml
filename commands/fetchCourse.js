import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/course.js'
import writejson from '../utils/writejson.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    console.log(data)
    // 丟進安裝的套件可以使用jquery的語法，data是html的文字
    const $ = cheerio.load(data)
    // 建立空的陣列放入html
    const courses = []
    // jquery語法去抓取網頁
    $('#general .card').each(function () {
      const bubble = JSON.parse(JSON.stringify(template))
      bubble.hero.url = 'https://wdaweb.github.io/' + $(this).find('img').attr('src').substr(2).trim()
      bubble.body.contents[0].text = $(this).find('.card-title').text().trim()
      bubble.body.contents[1].contents[0].contents[0].text = $(this).find('.card-description').text().trim()
      courses.push(bubble)
    })

    const reply = {
      type: 'flex',
      altText: '共通課程查詢結果',
      contents: {
        type: 'carousel',
        contents: courses
      }
    }
    event.reply(reply)
    if (process.env.WRITEJSON) {
      writejson(reply, 'courses')
    }
    // console.log(JSON.stringify(reply, null, 2))
  } catch (error) {
    console.error(error)
  }
}
