document.addEventListener("DOMContentLoaded", async (event) => {
    // click update button
    const newAnswer = document.querySelector("#newAnswer");

    newAnswer.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(updateAnswerContent);
        const content = formData.get("answerContent");
        const questionId = formData.get("questionId")
        const body = { content, questionId };

        try {


            const res = await fetch(`/api/answers`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            })

            const {
                errors,
                answer,
            } = await res.json();


            if (errors) {
                
                const errorNewAnswer= document.querySelector('#errorNewAnswer');

                let errorContent = errors.map(message => {
                    return `<li>${message}</li>`
                })
                errorNewAnswer.innerHTML = `<p>The following error(s) occurred:<ul>${errorContent.join('')}</ul></p>`

                errorNewAnswer.style.display = 'block'
            }else{
               /// how to show the answer dynamically on the page??????

            }
        }
        catch(err){
            alert(
                "Something went wrong. Please check your internet connection and try again!"
            );

        }

    })





})