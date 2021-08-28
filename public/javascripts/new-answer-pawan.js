document.addEventListener("DOMContentLoaded", async (event) => {
    const cancelNewAnswer = document.querySelector("#cancelNewAnswer");
    cancelNewAnswer.addEventListener("click", () => {
      const errorNewAnswer = document.querySelector("#errorNewAnswer");
      errorNewAnswer.style.display = "none";
    });

    // when form is submit
    const newAnswer = document.querySelector("#newAnswer");

    newAnswer.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(newAnswer);
      const content = formData.get("answerContent");
      const questionId = formData.get("questionId");
      const body = { content, questionId };

      try {
        const res = await fetch(`/api/answers`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });

        const { errors, answer } = await res.json();

        //console.log('answer', answer)
        //no User appended to it,use answered by you to indicate that is current user's newly created answer.
        //console.log('err',errors)
        if (errors) {
          const errorNewAnswer = document.querySelector("#errorNewAnswer");

          let errorContent = errors.map((message) => {
            return `<li>${message}</li>`;
          });
          errorNewAnswer.innerHTML = `<p>The following error(s) occurred:<ul>${errorContent.join(
            ""
          )}</ul></p>`;

          errorNewAnswer.style.display = "block";
        } else {
          // dynamically add the newly posted answer to the answer section
          const newQuestionContainer = document.querySelector(
            "#newAnswer"
          );
          newQuestionContainer.innerHTML = `
                  <div id="newQuestionContainer">
                  </div>
                    <div class="logged-in-container answer-container">
                      <div class="question-stats-container answer-username-container" id="newQuestionContainer">
                        <div class="question-stats-container answer-stats-container">
                          <div class="test-2">
                            <p class="vote-count-1 answer-vote-count">${answer.votes | 0}</p>
                          </div>

                          <div class="question-stats-votes answer-stats-votes logged-in-votes">
                            <form action="/answers/${answer.id}/votes" method="post">
                              <input type="hidden" name="aUpVote" value="1"/>

                              <button class="arrow-up-container hide-btn">
                                <div class="arrow-up"></div>
                              </button>
                            </form>

                            <div class="up-votes">upVote</div>

                            <div class="down-votes">downVote</div>

                            <form action="/answers/${answer.id}/votes" method="post">
                            <input type="hidden" name="aDownVote" value="0"/>

                              <button class="arrow-up-container hide-btn">
                                <div class="arrow-down"></div>
                              </button>
                            </form>
                          </div>
                        </div>

                        <div class="up-votes answer-username answer-info">
                          <span class='asked-by'>answered at: ${new Date(answer.createdAt).toLocaleDateString()}</span>

                          <span class='time'>by YOU</span></span>
                        </div>

                      <div class="question-summary-container">
                        <div class="question-summary edit-question-question">
                          <div class="question answer single-question new-answer-content" id="answerContent_${answer.id}">${answer.content}
                            <div class="edit-form">
                              <p id="errorUpdateAnswer_${answer.id}" style="color:red;"></p>

                              <form action="/answers/${answer.id}" method="post" id="updateAnswerContent_${answer.id}" style="display:none">
                                <input style="display:none" name="answerId"/>
                                <textarea class="edit-input edit-text-area answer-text-area" name="answerContent" id="textareaUpdateAnswer_${answer.id}">${answer.content}</textarea>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="question-summary-footer">
                        <div class="edit-btns answer-edit-btns after-cancel">
                          <button class="btn log-in-submit delete-btn answer-delete answer-edit-submit after-cancel" type="submit" form="updateAnswerContent" id="submitUpdateAnswerButton_${answer.id}" style="display:none">Submit Update</button>

                          <button class="btn log-in-submit delete-btn answer-delete answer-edit-cancel after-cancel" id="cancelUpdateAnswerButton_${answer.id}" style="display:none">Cancel Update</button>
                        </div>

                        <div class="question-summary-user"></div>
                          <div class="single-question-btns">
                            <a class="btn log-in-submit delete-btn" href="/questions/delete/question.id">Delete Question</a>

                            <button class="btn log-in-submit edit-btn" id="updateQuestionButton">Edit Question</button>
                          </div>
                      </div>
                    </div>
                  `;
          // update number of answers by adding 1
          const numberOfAnswers = document.querySelector("#numberOfAnswers");
          numberOfAnswers.innerHTML = parseInt(numberOfAnswers.innerHTML, 10) + 1;
        }
      } catch (err) {
        /// When sometimes will hit this, but all data saved, page on browser good, console.log(err) to see it in browser dev console
        /// another way to check err is to looking for the newly created/saved data in db at API back end/json; console.log a lot in api route
        console.log(err);

        alert(
          "Something went wrong. Please check your internet connection and try again!"
        );
      }
    });
  });
