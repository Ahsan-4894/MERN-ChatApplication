import React from 'react'
import { TransformImage } from '../../lib/features'

const RenderAttachments = (file, url) => {
  if(file==='video') return <video src={url} controls preload='none' width={"200px"} />
  if(file==='image') return <img src={TransformImage(url, 200)} width={"200px"} height={"100px"} />
  if(file==='audio') return <audio src={url} width={"200px"} />
}

export default RenderAttachments
