
const clickAnswersContainer = async (event) => {
    //event.target the one you click
    //event.currentTarget the whole div flex that eventListener is attached to


    //if edit button is clicked, the textarea to edit answer and submit update button will be displayed. And the edit button will be hidden.

    if (event.target.id.startsWith('updateAnswerButton_')) {

        const answerId = event.target.id.split('_')[1]
        // to display textarea
        const updateAnswerContent = document.querySelector(`#updateAnswerContent_${answerId}`);
        updateAnswerContent.style.display = 'flex';
        // to hide edit button
        const updateAnswerButton = document.querySelector(`#updateAnswerButton_${answerId}`);
        updateAnswerButton.style.display = 'none';

        // to show cancel update button
        const cancelUpdateAnswerButton = document.querySelector(`#cancelUpdateAnswerButton_${answerId}`);
        cancelUpdateAnswerButton.style.display = 'flex';

        // to hide origianl answer content

        const answerContent = document.querySelector(`#answerContent_${answerId}`);
        answerContent.style.display = 'none';

        const submitButton = document.querySelector(`#submitUpdateAnswerButton_${answerId}`);
        submitButton.style.display = 'flex';

        //listening its edit form to submit



        updateAnswerContent.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(updateAnswerContent);
            const content = formData.get("answerContent");
            const answerId = formData.get("answerId")
            const body = { content };

            try {


                const res = await fetch(`/api/answers/${answerId}`, {
                    method: "PUT",
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                })

                const {
                    errors,
                    answer,

                } = await res.json();


                if (errors) {

                    //     const errorUpdateAnswer = document.querySelector(`#errorUpdateAnswer_${answerId}`);

                    //     let errorContent = errors.map(message => {
                    //         return `<li>${message}</li>`
                    //     })
                    //     errorUpdateAnswer.innerHTML = `<p>The following error(s) occurred:<ul>${errorContent.join('')}</ul></p>`

                    //     errorUpdateAnswer.style.display = 'flex'
                }

                else {

                    //if no error/no empty value as question content, original answer to be updated as edits
                    const answerContent = document.querySelector(`#answerContent_${answerId}`);
                    answerContent.innerHTML = content;
                    answerContent.style.display = 'flex';


                    // to hide textarea
                    const updateAnswerContent = document.querySelector(`#updateAnswerContent_${answerId}`);
                    updateAnswerContent.style.display = 'none';
                    // to show edit button
                    const updateAnswerButton = document.querySelector(`#updateAnswerButton_${answerId}`);
                    updateAnswerButton.style.display = 'flex';

                    // to hide cancel update button
                    const cancelUpdateAnswerButton = document.querySelector(`#cancelUpdateAnswerButton_${answerId}`);
                    cancelUpdateAnswerButton.style.display = 'none';

                    // to hide error div
                    
                    const errorUpdateAnswer = document.querySelector(`#errorUpdateAnswer_${answerId}`);
                    if (errorUpdateAnswer){
                        errorUpdateAnswer.style.display = 'none';

                    }

                    // to hide submit div
                    const submitButton = document.querySelector(`#submitUpdateAnswerButton_${answerId}`);
                    submitButton.style.display = 'none';

                }


            }

            catch (err) {
                console.log(err)
                alert(
                    
                    "Something went wrong. Please check your internet connection and try again!"
                );

            }


        })






    }

    // if click cancel update button
    if (event.target.id.startsWith('cancelUpdateAnswerButton_')) {

        const answerId = event.target.id.split('_')[1]
        // to hide textarea
        const updateAnswerContent = document.querySelector(`#updateAnswerContent_${answerId}`);
        updateAnswerContent.style.display = 'none';
        // to show edit button
        const updateAnswerButton = document.querySelector(`#updateAnswerButton_${answerId}`);
        updateAnswerButton.style.display = 'flex';

        // to hide cancel update button
        const cancelUpdateAnswerButton = document.querySelector(`#cancelUpdateAnswerButton_${answerId}`);
        cancelUpdateAnswerButton.style.display = 'none';

        // to showorigianl answer content

        const answerContent = document.querySelector(`#answerContent_${answerId}`);
        answerContent.style.display = 'flex';

        // to hide error div
        const errorUpdateAnswer = document.querySelector(`#errorUpdateAnswer_${answerId}`);
        if (errorUpdateAnswer){
            errorUpdateAnswer.style.display = 'none';

        }
        

        // to hide submit div
        const submitButton = document.querySelector(`#submitUpdateAnswerButton_${answerId}`);
        submitButton.style.display = 'none';

    }



}



document.addEventListener("DOMContentLoaded", async (event) => {
    // click update button
    const answersContainer = document.querySelector("#answersContainer");

    answersContainer.addEventListener("click", clickAnswersContainer)





})
