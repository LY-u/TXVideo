import axios from 'axios';

class Api {

  constructor(){
    let domain = 'http://vv.video.qq.com'
    this.prePath = process.env.NODE_ENV === 'production' ?　domain : '/api'
  }
  
  async getInfo(id){
    let path = this.prePath + `/getinfo?vids=${id}&platform=101001&charge=0&otype=json`
    // let path = domain + `/getinfo?vids=${id}&platform=101001&charge=0&otype=json`
    const res = await axios.get(path);
    // console.log(res);
    let data = res.data;
    return data;
  }
}

export default new Api()