
const clickEditButton = async(event)=>{
    //once edit button is clicked, the textarea to edit question and submit update button will be displayed. And the edit button will be hidden.
    const updateQuestionContent = document.querySelector("#updateQuestionContent");
    updateQuestionContent.style.display = 'block';

    updateQuestionButton.style.display = 'none';

    const submitUpdateQuestionButton = document.querySelector("#submitUpdateQuestionButton");
    submitUpdateQuestionButton.style.display = 'block';

    const cancelUpdateQuestionButton = document.querySelector("#cancelUpdateQuestionButton");
    cancelUpdateQuestionButton.style.display = 'block';

    const questionContent = document.querySelector("#questionContent");
    // questionContent.style.display = 'none';

}

const submitUpdate = async(event)=>{
    event.preventDefault();
    const formData = new FormData(updateQuestionContent);
    const content= formData.get("questionContent");
    const questionId = formData.get("questionId")
    const body = { content };

    try {
        const res = await fetch(`/api/questions/${questionId}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"},
        })

        // Another way -
            // back-end API route ends with next(err), then res.status = err.status
            //  if (res.status === 401) {
            //     window.location.href = "/login";
            //     return;
            // }
            //if back-end API route ends with next(err), then res.ok will be false; res will include error  object, thus throw res, that will be catched by catch(err) below
            //  if (!res.ok) {
            // throw res;
            // }

        const {
            errors,
            question: { content },
            err
         } = await res.json();

        // If empty value is submitted, it will dynamically show an error message. If no authorization, it will dynamically show an error message
        if (errors){
            const errorUpdateQuestion = document.querySelector("#errorUpdateQuestion");

            let errorContent = errors.map(message=>{
                return `<li>${message}</li>`
            })
            errorUpdateQuestion.innerHTML = `<p>The following error(s) occurred:<ul>${errorContent.join('')}</ul></p>`

            errorUpdateQuestion.style.display = 'block'


        }
        else{

            //if no error/no empty value as question content, original question to be updated as edits
            const questionContent = document.querySelector("#questionContent");
            questionContent.innerHTML = content;
            // questionContent.style.display = 'block';
            // hide edit form after edit is done and display eidt question button

            let updateQuestionContent = document.querySelector("#updateQuestionContent");

            updateQuestionContent.style.display = 'none'

            const updateQuestionButton = document.querySelector("#updateQuestionButton");
            updateQuestionButton.style.display = 'block';

            const cancelUpdateQuestionButton = document.querySelector("#cancelUpdateQuestionButton");
            cancelUpdateQuestionButton.style.display = 'none';

            const submitUpdateQuestionButton = document.querySelector("#submitUpdateQuestionButton");
            submitUpdateQuestionButton.style.display = 'none';

            const errorUpdateQuestion = document.querySelector("#errorUpdateQuestion");
            errorUpdateQuestion.style.display='none'
        }
    }
    catch(err){
    // another way to catch error in practice project;
    //     if (err.status >= 400 && err.status < 600) {
    //         const errorJSON = await err.json();
    //         const errorUpdateQuestion = document.querySelector("#errorUpdateQuestion");
    //         // default error message
    //         let errorsHtml = [
    //             `
    //     <div>
    //         Something went wrong. Please try again.
    //     </div>
    //   `,
    //         ];
    //         const { errors } = errorJSON;
    //         /// if array of error; extract error message from error object
    //         if (errors && Array.isArray(errors)) {
    //             errorsHtml = errors.map(
    //                 (message) => `
    //       <div class="alert alert-danger">
    //           ${message}
    //       </div>
    //     `
    //             );
    //         }
    //         errorUpdateQuestion.innerHTML = errorsHtml.join("");
    //     }
    // else { }


    // internet down => fetch will only throw error if internet connection issue

        alert(
            "Something went wrong. Please check your internet connection and try again!"
            );
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

    const errorUpdateQuestion = document.querySelector("#errorUpdateQuestion");
    errorUpdateQuestion.style.display = 'none';
}


document.addEventListener("DOMContentLoaded", async(event) => {
    // click update button
    const updateQuestionButton = document.querySelector("#updateQuestionButton");
    if (updateQuestionButton){
        updateQuestionButton.addEventListener("click", clickEditButton)

    }


    //submit update
    const updateQuestionContent = document.querySelector("#updateQuestionContent");
    if (updateQuestionContent){
        updateQuestionContent.addEventListener("submit", submitUpdate)

    }


    // cancel update
    const cancelUpdateQuestionButton = document.querySelector("#cancelUpdateQuestionButton");
    if (cancelUpdateQuestionButton ){
        cancelUpdateQuestionButton.addEventListener("click", cancelUpdate)

    }


})
