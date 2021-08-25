
const clickEidtButton = async(event)=>{
    //once edit button is clicked, the textarea to edit question and submit update button will be displayed. And the edit button will be hidden. 
    const updateQuestionContent = document.querySelector("#updateQuestionContent");
    updateQuestionContent.style.display = 'block'
    
    updateQuestionButton.style.display = 'none';    
    
}

const submitUpdate = async(event)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const content= formData.get("updateQuestion");
    const body = { content };

    try {
        // question in pug file is accessible here in this script js ?
        const res = await fetch(`/questions/${question.id}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"},
        })

        if (res.status === 401) {
            window.location.href = "/login";
            return;
        }
        if (!res.ok) {
            throw res;// res will include error  object
        }

        const {
        
            question: { content },
        } = await res.json();

        //original question
        const questionContent = document.querySelector("#questionContent");
        questionContent.innerHTML=content;

    

    }catch(err){

    }
}

document.addEventListener("DOMContentLoaded", async(event) => {
    const updateQuestionButton = document.querySelector("#updateQuestionButton");

    updateQuestionButton.addEventListener("click", clickEidtButton)

    const updateQuestionContent = document.querySelector("#updateQuestionContent");

    updateQuestionContent.addEventListener("submit", submitUpdate)

})