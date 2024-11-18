const button = document.querySelector(".btn");
const result = document.querySelector(".result");
const loader = document.querySelector(".loader");
const remark = document.querySelector(".result-remark");
const summaryScores = document.querySelectorAll(".summary-test-score");

// this is a funtion to generate number between 1-99
function random() {
  return Math.floor(Math.random() * 99) + 1;
}

// is a function that generate a remark base on the score provided
function getRemark(score) {
  switch (true) {
    case score >= 90 && score <= 99:
      return `You scored higher than 90% of the people who have taken these tests. Excellent performance!`;

    case score >= 75 && score < 90:
      return `You scored higher than 75% of the people who have taken these tests. Great work!`;

    case score >= 60 && score < 75:
      return `You scored higher than 60% of the people who have taken these tests. Good job!`;

    case score >= 40 && score < 60:
      return `You scored higher than nearly half of the people who have taken these tests. You're getting there!`;

    case score >= 20 && score < 40:
      return `You scored higher than some of the test-takers. Keep going, and you'll see progress with more effort!`;

    case score >= 1 && score < 20:
      return `You scored higher than only a few people who have taken these tests. Don’t worry, there's plenty of room to improve!`;

    default:
      return `click the continue button to generate your score and see how you compare with others!`;
  }
}

// a fuction tha generate score
const generateScore = (_) => {
  // generate scores and store in am array variable
  const scores = [random(), random(), random(), random()];

  //   find the average of scores generated
  const averageTotalScore = Math.floor(
    scores.reduce((score, curr) => {
      curr += score;
      return curr;
    }, 0) / 4
  );

  // this piece of code is for assigning a value to a css custom variable
  // ============================================================================================
  document.documentElement.style.cssText = `--animation-duration: ${averageTotalScore * 50}ms`;
  const x = getComputedStyle(document.documentElement).getPropertyValue("--animation-duration");
  // ============================================================================================

  // adding scores to the summaries
  summaryScores.forEach((summaryScore, index) => {
    summaryScore.textContent = `${scores[index]}`.padStart(2, "0");
  });

  // add remarkto the UI
  remark.textContent = getRemark(averageTotalScore);

  //responsible for adding the average score and adding the rotate animation
  let count = 1;
  const addResult = setInterval(() => {
    if (count === averageTotalScore) {
      loader.classList.remove("loader-rotate");
      clearInterval(addResult);
      return;
    }

    if (loader.classList.contains("loader-rotate")) {
      loader.classList.remove("loader-rotate");
    }

    if (!loader.classList.contains("loader-rotate")) {
      loader.classList.add("loader-rotate");
    }

    result.textContent = `${count}`.padStart(2, "0");
    count += 1;
  }, 25);
};

button.addEventListener("click", generateScore);
