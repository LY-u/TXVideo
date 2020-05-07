
import api from '@/assets/api'
import '@/assets/style.css'

console.warn('process.env.NODE_ENV:', process.env.NODE_ENV)

function extractUrl(res) {
  let index = res.indexOf('{')
  let str = res.slice(index, -1)
  let parseData = JSON.parse(str)
  console.log(parseData)

  if(parseData.vl){
    let row = (parseData.vl.vi || []) [0] || {}
    let { fn, fvkey, ul } = row
    let url = ((ul.ui || []) [0] || {}).url
    let uri = url + fn + '?vkey=' + fvkey
    console.log(uri)

    setVideo(uri)
  }else if(parseData.msg){
    setVideo()
    throwErr(parseData.msg)
  }

}

function setVideo(uri){
  let ele = document.getElementById('video')
  ele.setAttribute('src', uri)
  document.getElementsByClassName('urlString')[0].innerHTML = uri
  loadVideo(uri)
}
function throwErr(msg){


  let p = document.createElement('p');
  let parent = document.getElementsByClassName('urlString')[0]
  p.innerHTML = msg
  p.classList.add('err-info');
  parent.appendChild(p)
  setTimeout(function(){
    parent.removeChild(p)
  }, 3000)
}
function loadVideo(b){
  let box = document.getElementById('video')
  box.style.display = b ? 'block' : 'none'
}

function requestInfo( str ){
  api.getInfo(str).then(res => {
    extractUrl(res)
  }).catch(err => {
    console.log(err)
  })
}


let infoInput = document.getElementById('getInfo')

infoInput.onkeyup = function (e) {
  if (e.keyCode == 13) requestInfo(e.target.value)
}

document.getElementById('getBtn').onclick = function() {
  requestInfo(infoInput.value)
}
