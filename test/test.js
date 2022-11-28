import axios from 'axios'
import * as cheerio from 'cheerio'

const main = async (event) => {
  try {
    console.log('main' + event)
    const { data } = await axios.get('https://artemperor.tw/tidbits')
    const $ = cheerio.load(data)
    $('.list_box').each(function () {
      // console.log($(this).find('h2').text())
      if ($(this).find('h2').text().includes(event)) {
        console.log($(this).find('p').text().substring(3, 26).trim())
      }
    })

    // const Exhibitions = []
    // $('.list_box').each(function (event) {
    // if (event === $(this).find('h2').text().trim()) {
    // const bubble = JSON.parse(JSON.stringify(template))
    // Exhibitions.push(bubble)
    // console.log(event.message.text === $(this).includes($(this).find('h2').text().trim()))
    // }
    // console.log(Exhibitions)
  } catch (error) {
    console.log('error' + error)
  }
}

main('【在夾縫中行走】')
