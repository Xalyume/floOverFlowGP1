document.addEventListener("DOMContentLoaded", async (event) => {

  const cancelNewAnswer = document.querySelector("#cancelNewAnswer");
    
  if (cancelNewAnswer){
      cancelNewAnswer.addEventListener("click", () => {
          const errorNewAnswer = document.querySelector("#errorNewAnswer");
          errorNewAnswer.style.display = 'none';

      })

  }
  


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
              const newQuestionContainer = document.querySelector("#secondaryQuestionContainer")
              newQuestionContainer.innerHTML = `
              <div class ='test-container'>
                <div class='when'> answered at
                    <span class='when2'> ${new Date(answer.createdAt).toLocaleDateString()}</span>
                    <div class='when2'>
                        <span class='when'> by YOU</span>
                    </div>
                </div>
               
                <div class='votes-answer'>
                    <form action=/answers/${answer.id}/votes method="post">
                        <input type="hidden" name="aUpVote" value="1">
                        <button class='arrow-up-container hide-btn'>
                            <div class='arrow-up'></div>
                        </button>
                    </form>
                

                <div class='vote-count-answer'> ${answer.votes | 0}</div>

                <form action=/answers/${answer.id}/votes method="post">
                    <input type="hidden" name="aDownVote" value="0">
                    <button class='arrow-up-container hide-btn'>
                        <div class='arrow-down'></i>
                    </button>
                </form>

                </div>

                <div class='answer content-answer content-answer-2' id=answerContent_${answer.id}>${answer.content}</div>

                <div class='answer-edit-form'>
                    <p id = errorUpdateAnswer_${answer.id} style = 'color:red'></p>
                    <form action = /answers/${answer.id} method = 'post' id = updateAnswerContent_${answer.id} style = 'display:none')>
                        <input style = 'display:none' name = 'answerId' value = ${answer.id}>
                        <textarea rows='8' cols='120' id = textareaUpdateAnswer_{answer.id} name = "answerContent" class='log-in-input answer-input move-text-area' required> ${answer.content}</textarea>


                        
                    </form>

                    
                    
                </div>

                <div class ='answer-buttons-container'>

        

                    <button id = submitUpdateAnswerButton_${answer.id} class='edit-answer-btn log-in-submit new-question-btn answer-submit-btn submit-answer' form= updateAnswerContent_${answer.id} style='display:none'>Submit</button>

                    <button id = cancelUpdateAnswerButton_${answer.id} style = 'display:none' class='edit-answer-btn log-in-submit new-question-btn answer-submit-btn cancel-answer'>Cancel</button>

                    

                <div class = 'deleteAndEdit'> 
                    <button id = updateAnswerButton_${answer.id} class='edit-answer-btn log-in-submit new-question-btn answer-submit-btn '>Edit</button>
                    <form action = /answers/delete/${answer.id} method = 'get'>
                        <Button class='edit-answer-btn log-in-submit new-question-btn answer-submit-btn del-btn'> Delete </Button>
                    </form>
                </div>

                </div>
            </div>



            `
              // update number of answers by adding 1
              const numberOfAnswers = document.querySelector("#numberOfAnswers")
              numberOfAnswers.innerHTML = parseInt(numberOfAnswers.innerHTML,10)+1
             // clear textarea
              const newAnswerForm = document.querySelector("#content");
              newAnswerForm.value = '';
              

          }
      }
      catch(err){
         /// When sometimes will hit this, but all data saved, page on browser good, console.log(err) to see it in browser dev console
         /// another way to check err is to looking for the newly created/saved data in db at API back end/json; console.log a lot in api route
          //console.log(err)

              alert(
                  "Something went wrong. Please check your internet connection and try again!"
              );

      }

  })





})
