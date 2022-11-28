export default {
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://d2onjhd726mt7c.cloudfront.net/images/datas/000/097/315/1il39nv00jbb0egf179y7i4pwpoxvr45_800x420%5E.jpg',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    action: {
      type: 'message',
      label: 'action',
      text: 'hello'
    }
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '【秋收冬藏】琂樂堂跨年精品展',
        weight: 'bold',
        size: 'xl'
      }
    ]
  }
}
