export function isWeixin () {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
        return true;
    } else{
        return false;
    }
}

export function downloadBlob (blob, fileName) {
    try {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.style.display = 'none'
        link.href = url;
        link.setAttribute('download', fileName); //文件名/后缀
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        console.log("下载失败");
    }
}