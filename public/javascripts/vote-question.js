const qUpVoteIcon = document.querySelector("#qUpVoteIcon");
const qDownVoteIcon = document.querySelector("#qDownVoteIcon");


    
// we do not want to make vote dynamically, redirect everytime. that's why the color change does not stay?
qUpVoteIcon.addEventListener("click", async(event)=>{
    if (qUpVoteIcon.style.color==="red"){
        qUpVoteIcon.style = "color:black"
    } else{
        qUpVoteIcon.style = "color:red"
    }       
})

qDownVoteIcon.addEventListener("click", async (event) => {
    if (event.target.style.color === "blue") {
        event.target.style = "color:black"
    } else {
        event.target.style = "color:blue"
    }
})




