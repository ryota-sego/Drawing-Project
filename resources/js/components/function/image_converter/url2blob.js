import Blob from "cross-blob";

const url2blob = (url) => {
	
	const bin = window.atob(url.replace(/^.*,/, ''));
	let buffer = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) {
		buffer[i] = bin.charCodeAt(i);
	}

	const blob = new Blob([buffer.buffer], {
        type: 'image/png'
    });
    
    return blob
}

export default url2blob;