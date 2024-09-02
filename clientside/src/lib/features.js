
export const FileFormat = (url)=>{
    const fileExt = url?.split(".").pop();
    if(fileExt === 'mp4' || fileExt==='web' || fileExt === 'ogg') return "video";
    if(fileExt === 'mp3' || fileExt==='wav') return "audio";
    if(fileExt === 'jpg' || fileExt === 'jpeg' ||  fileExt==='png' || fileExt === 'gif') return "image";
}
export const TransformImage = (url, widht=150)=>url;
