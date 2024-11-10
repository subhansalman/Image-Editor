var imgarea=document.querySelector(".imgarea");
var img=document.querySelector(".img");
var file;
var fileInp=document.querySelector(".fileinp");
var icon=document.querySelector(".icon");
var span=document.querySelector(".span");
var downloadBtn=document.querySelector(".dwn-btn");
var contrast=100 + "%";
var brightness=100 + "%";
var huerotate=0 + "deg";
var opacity=1;
var sepia=0+"%";
var grayscale= 0+"%";
var blurr=0+"px";
var saturate=100 + "%";

const handleFileInput=(e)=>{
    file=e.target.files[0];
    if(file) img.setAttribute("src",URL.createObjectURL(file));
    img.addEventListener("load", ()=>{
        img.style.display="block";
        span.style.display="none";
        icon.style.display="none"
    })
}

imgarea.addEventListener("click", ()=>{
    fileInp.click();
})

const getEffectchange=(e)=>{
    if(file){
        if(e.target.name==="contrast"){
            contrast=e.target.value+"%"
        }
        if(e.target.name==="brightness"){
            brightness=e.target.value+"%"
        }
        if(e.target.name==="blurr"){
            blurr=e.target.value+"px"
        }
        if(e.target.name==="grayscale"){
            grayscale=e.target.value+"%"
        }
        if(e.target.name==="sepia"){
            sepia=e.target.value+"%"
        }
        if(e.target.name==="opacity"){
            opacity=e.target.value;
        }
        if(e.target.name==="huerotate"){
            huerotate=e.target.value+"deg"
        }
        if(e.target.name==="saturate"){
            saturate=e.target.value+"%"
        }


        img.style.filter = `hue-rotate(${huerotate}) opacity(${opacity}) sepia(${sepia}) grayscale(${grayscale}) brightness(${brightness}) blur(${blurr}) contrast(${contrast}) saturate(${saturate})`;



    }

}

downloadBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Fix the typo in setting the canvas width
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;  // Corrected typo here (naturalWidth)

    // Apply filters to the canvas context
    ctx.filter = `hue-rotate(${huerotate}) opacity(${opacity}) sepia(${sepia}) grayscale(${grayscale}) brightness(${brightness}) blur(${blurr}) contrast(${contrast}) saturate(${saturate})`;

    // Draw the image on the canvas with filters applied
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Create a temporary link element for downloading the image
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg");  // Specify file format here
    a.download = file ? file.name : "edited-image.jpg";  // Set default name if file is not present
    a.click();
});
