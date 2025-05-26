let start = document.querySelector(".start")
let reset = document.querySelector(".reset")
let fillCircle = document.querySelector(".fill-circle") 
let mainCircle = document.querySelector(".main-circle") 

let timer
let totalSeconds = 0
let passSeconds = 0

const inputs = {
    day :  document.getElementById("day"),
    hour :  document.getElementById("hour"),
    minute :  document.getElementById("minute"),
    second :  document.getElementById("second"),
}

function formatTime(seconds) {
    let days = Math.floor(seconds / 86400);
    seconds = seconds - days * 86400;
  
    let hours = Math.floor(seconds / 3600);
    seconds = seconds - hours * 3600;
  
    let minutes = Math.floor(seconds / 60);

    let secs = seconds - minutes * 60;
  
    let d = String(days).padStart(2, '0');
    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(secs).padStart(2, '0');
  
    return `${d} : ${h} : ${m} : ${s}`;
  }

  
start.addEventListener("click" , function(){
    const day = Number(inputs.day.value) || 0
    const hour = Number(inputs.hour.value) || 0
    const minute = Number(inputs.minute.value) || 0
    const second = Number(inputs.second.value) || 0
    totalSeconds = day * 86400 + hour * 3600 + minute * 60 + second

    if(totalSeconds <= 0){
        alert("Enter a valid time!")
        return;
    }

    timer = setInterval(()=>{
        passSeconds++
        
        let remain = totalSeconds - passSeconds 
        let angle = (passSeconds / totalSeconds) * 360

        fillCircle.style.background = `conic-gradient(#BC6FF1 ${angle}deg, rgb(255, 255, 255) 0deg)`
        mainCircle.textContent = formatTime(remain)

        //when time over
        if (passSeconds >= totalSeconds){
            clearInterval(timer)
            fillCircle.style.background = `conic-gradient(#BC6FF1 360deg, rgb(255, 255, 255) 0deg)`
            mainCircle.textContent = `00 : 00 : 00 : 00`
        }   

    }, 1000)
})  


reset.addEventListener("click" , function(){
    clearInterval(timer)
    passSeconds = 0
    totalSeconds = 0

    fillCircle.style.background = `conic-gradient(#BC6FF1 0.6deg, rgb(255, 255, 255) 0deg)`
    mainCircle.textContent = `00 : 00 : 00 : 00`

    Object.values(inputs).forEach(inputs => inputs.value = "") //clear input fields

})  
