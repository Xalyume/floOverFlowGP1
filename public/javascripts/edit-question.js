
const clickEidtButton = async(event)=>{
    //once edit button is clicked, the textarea to edit question and submit update button will be displayed. And the edit button will be hidden. 
    const updateQuestionContent = document.querySelector("#updateQuestionContent");
    updateQuestionContent.style.display = 'block'
    
    updateQuestionButton.style.display = 'none';    
    
}

const submitUpdate = async(event)=>{
    event.preventDefault();
    const formData = new FormData(updateQuestionContent);
    const content= formData.get("questionContent");
    const questionId = formData.get("questionId")
    const body = { content };

    try {
        // question in pug file is accessible here in this script js ?
        const res = await fetch(`/questions/${questionId}`, {
            method: "PUT",
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

        //original question to be updated as edits
        const questionContent = document.querySelector("#questionContent");
        questionContent.innerHTML=content;

        // hide edit form after edit is done
        
        updateQuestionContent.style.display = 'none'

        updateQuestionButton.style.display = 'block';
    

    }
    ///// need to think about err?
    catch(err){

    }
}

document.addEventListener("DOMContentLoaded", async(event) => {
    const updateQuestionButton = document.querySelector("#updateQuestionButton");

    updateQuestionButton.addEventListener("click", clickEidtButton)

    const updateQuestionContent = document.querySelector("#updateQuestionContent");

    updateQuestionContent.addEventListener("submit", submitUpdate)

})