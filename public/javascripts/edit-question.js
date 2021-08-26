
const clickEditButton = async(event)=>{
    //once edit button is clicked, the textarea to edit question and submit update button will be displayed. And the edit button will be hidden.
    const updateQuestionContent = document.querySelector("#updateQuestionContent");
    updateQuestionContent.style.display = 'block';

    updateQuestionButton.style.display = 'none';

    const cancelUpdateQuestionButton = document.querySelector("#cancelUpdateQuestionButton");
    cancelUpdateQuestionButton.style.display = 'block';

    const submitUpdateQuestionButton = document.querySelector("#submitUpdateQuestionButton");
    submitUpdateQuestionButton.style.display = 'block';

    // const questionContent = document.querySelector("#questionContent");
    // questionContent.style.display = 'none';

}

const submitUpdate = async(event)=>{
    event.preventDefault();
    const formData = new FormData(updateQuestionContent);
    const content= formData.get("questionContent");
    const questionId = formData.get("questionId")
    const body = { content };

    try {
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
        // need to do validation errors!!!!!!!!!!
        // const {
        //     errors
        // } = await res.json();

        // if (errors){
        //     const errorUpdateQuestion = document.querySelector("#errorUpdateQuestion");
        //     let errorContent = errors.map(message=>{
        //         return `<li>${message}</li>`
        //     })
        //     errorUpdateQuestion.innerHTML = `<p>The following error(s) occurred:<ul>${errorContent.join('')}</ul></p>`
        // }

        //original question to be updated as edits
        const questionContent = document.querySelector("#questionContent");
        questionContent.innerHTML=content;
        questionContent.style.display = 'block';

        // hide edit form after edit is done

        updateQuestionContent.style.display = 'none'

        updateQuestionButton.style.display = 'block';

        const cancelUpdateQuestionButton = document.querySelector("#cancelUpdateQuestionButton");
        cancelUpdateQuestionButton.style.display = 'none';
    }
    ///// need to think about err?
    catch(err){

    }
}


const cancelUpdate = async (event) => {

    const questionContent = document.querySelector("#questionContent");
    questionContent.style.display = 'block';

    const updateQuestionContent = document.querySelector("#updateQuestionContent");
    updateQuestionContent.style.display = 'none';

    const updateQuestionButton = document.querySelector("#updateQuestionButton");
    updateQuestionButton.style.display = 'block';

    const cancelUpdateQuestionButton = document.querySelector("#cancelUpdateQuestionButton");
    cancelUpdateQuestionButton.style.display = 'none';


    const submitUpdateQuestionButton = document.querySelector("#submitUpdateQuestionButton");
    submitUpdateQuestionButton.style.display = 'none';



}


document.addEventListener("DOMContentLoaded", async(event) => {
    // click update button
    const updateQuestionButton = document.querySelector("#updateQuestionButton");

    updateQuestionButton.addEventListener("click", clickEditButton)

    //submit update
    const updateQuestionContent = document.querySelector("#updateQuestionContent");

    updateQuestionContent.addEventListener("submit", submitUpdate)

    // cancel update
    const cancelUpdateQuestionButton = document.querySelector("#cancelUpdateQuestionButton");

    cancelUpdateQuestionButton.addEventListener("click", cancelUpdate)

})
