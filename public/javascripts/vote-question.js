const qUpVoteButton = document.querySelector("#qUpVoteButton");
const qDownVoteButton = document.querySelector("#qDownVoteButton");


    
// we do not want to make vote dynamically, redirect everytime. that's why the color change does not stay?
qUpVoteButton.addEventListener("click", async(event)=>{

    if (qUpVoteButton.style.color==="red"){
        qUpVoteButton.style = "color:black"
    } else{
        qUpVoteButton.style = "color:red"
    }       
})

qDownVoteButton.addEventListener("click", async (event) => {
    if (event.target.style.color === "blue") {
        event.target.style = "color:black"
    } else {
        event.target.style = "color:blue"
    }
})




