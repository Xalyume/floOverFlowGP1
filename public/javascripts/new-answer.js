document.addEventListener("DOMContentLoaded", async (event) => {
    // click update button
    const newAnswer = document.querySelector("#newAnswer");

    newAnswer.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(newAnswer);
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

           //console.log('answer',answer) no User appended to it,use answered by you to indicate that is current user's newly created answer.
           //console.log('err',errors)
            if (errors) {
                
                const errorNewAnswer= document.querySelector('#errorNewAnswer');

                let errorContent = errors.map(message => {
                    return `<li>${message}</li>`
                })
                errorNewAnswer.innerHTML = `<p>The following error(s) occurred:<ul>${errorContent.join('')}</ul></p>`

                errorNewAnswer.style.display = 'block'
            }else{
        
                const newQuestionContainer = document.querySelector("#newQuestionContainer")
                newQuestionContainer.innerHTML = `

                <div>
                     <form action=/answers/${answer.id}/votes method="post">
	                    <input type="hidden" name="aUpVote" value="1">
                         <button style=color:${answer.aUpVoteColor}>
		                    <i class="material-icons">thumb_up</i>
	                    </button> 
                    </form>
  
                </div> 
                <div> ${answer.votes | 0}</div>
                <div>
                    <form action=/answers/${answer.id}/votes method="post">
                        <input type="hidden" name="aDownVote" value="0">
                        <button style= color:${answer.aDownVoteColor}>
                             <i class="material-icons">thumb_down</i>
	                    </button>
                     </form>
                </div>
                <div> by You </div>
                <div class="answer" id=answerContent_${answer.id}>${answer.content}</div>

                <div>
	                <p id = errorUpdateAnswer_${answer.id} style = 'color:red'></p>
	                <form action = /answers/${answer.id} method = 'post' id = updateAnswerContent_${answer.id} style = 'display:none')>

	                    <input style = 'display:none' name = 'answerId' value = ${answer.id}>
	                    <textarea id = textareaUpdateAnswer_{answer.id} name = "answerContent"> ${answer.content}</textarea>
	
	                    <button id = submitUpdateAnswerButton_${answer.id} >Submit Update</button> 

	                </form>

	                <button id = cancelUpdateAnswerButton_${answer.id} style = 'display:none')>Cancel Update</button> 
		
		
	                <button id = updateAnswerButton_${answer.id} >Edit Answer</button>

                </div>
                <div>
                <form action = / answers / delete /${answer.id}, method = 'get'>
                <Button> Delete </Button>
                </form> 
                
                </div>

                
                
              `
                newQuestionContainer.styple.display='block'

                // update # of answers????

                const numberOfAnswers = document.querySelector("#numberOfAnswers")
            

                
                

            }
        }
        catch(err){
           /// sometimes will hit this, but all data saved, page on browser good!
           /// finding the created/saved data in db; console.log a lot in api route
            alert(
                "Something went wrong. Please check your internet connection and try again!"
            );

        }

    })





})