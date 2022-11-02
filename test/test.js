// 先寫個簡單的js去測試確定爬蟲可以爬到資料
import axios from 'axios'
import * as cheerio from 'cheerio'

const main = async () => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    const courses = []
    $('#general .card-title').each(function () {
      console.log($(this).text().trim())
    })
    console.log(courses)
  } catch (error) {
    console.log(error)
  }
}
main()
