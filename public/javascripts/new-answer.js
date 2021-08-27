document.addEventListener("DOMContentLoaded", async (event) => {
    
    const cancelNewAnswer = document.querySelector("#cancelNewAnswer");
    cancelNewAnswer.addEventListener("click",()=>{
        const errorNewAnswer = document.querySelector("#errorNewAnswer");
        errorNewAnswer.style.display='none';
        
    })


    // when form is submit
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

            //console.log('answer', answer)
           //no User appended to it,use answered by you to indicate that is current user's newly created answer.
           //console.log('err',errors)
            if (errors) {
                
                const errorNewAnswer= document.querySelector('#errorNewAnswer');

                let errorContent = errors.map(message => {
                    return `<li>${message}</li>`
                })
                errorNewAnswer.innerHTML = `<p>The following error(s) occurred:<ul>${errorContent.join('')}</ul></p>`

                errorNewAnswer.style.display = 'block'
            }else{
                // dynamically add the newly posted answer to the answer section
                const newQuestionContainer = document.querySelector("#newQuestionContainer")
                newQuestionContainer.innerHTML = `
                <div> answered at ${new Date(answer.createdAt).toLocaleDateString()} </div>
                <div> by YOU </div>
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
                // update number of answers by adding 1
                const numberOfAnswers = document.querySelector("#numberOfAnswers")
                numberOfAnswers.innerHTML = parseInt(numberOfAnswers.innerHTML,10)+1
            

                
            }
        }
        catch(err){
           /// When sometimes will hit this, but all data saved, page on browser good, console.log(err) to see it in browser dev console
           /// another way to check err is to looking for the newly created/saved data in db at API back end/json; console.log a lot in api route
            console.log(err)
         
                alert(
                    "Something went wrong. Please check your internet connection and try again!"
                );
            
        }

    })





})