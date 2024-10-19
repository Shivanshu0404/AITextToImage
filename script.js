const key="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"
let inputtext=document.querySelector("#input")
let image=document.querySelector("#img")
let Genbutton=document.querySelector("#btn")
const svg=document.getElementById("svg")
const load=document.getElementById("load")
const reset=document.getElementById("reset")
const downloadbtn=document.getElementById("download")
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${key}` 
				
			},
			method: "POST",
			body: JSON.stringify({"inputs": inputtext.value}),
		}
	);
	const result = await response.blob();
	image.style.display='block'
	load.style.display="none" 
	return result;
}
async function generate() {
load.style.display="block"    
query().then((response) => {
	const objecturl=URL.createObjectURL(response)
    image.src=objecturl
	downloadbtn.addEventListener("click",()=>{
		download(objecturl)
	})
});
}
Genbutton.addEventListener("click",()=>{
    generate();
	svg.style.display='none'
})
inputtext.addEventListener("keydown",(e)=>{
    if (e.key=="Enter") {
        generate()
		svg.style.display='none'
    }
})
reset.addEventListener("click",()=>{
	inputtext.value=""
	window.location.reload()
})
function download(objectURL){
fetch(objectURL).then(res=>res.blob()).then(file=>{
	let a=document.createElement("a")
	a.href=URL.createObjectURL(file);
	a.download=new Date().getTime();
	a.click()
})
.catch(()=>alert('Failed Download'))
}