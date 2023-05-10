const question1 = {
    text: "How are you feeling today?",
    options: [
      { value: "Sad", label: "Sad" },
      { value: "Happy", label: "Happy" },
      { value: "Angry", label: "Angry" },
      { value: "Excited", label: "Excited" },
      { value: "Energetic", label: "Energetic" },
      { value: "Anxious", label: "Anxious" },
    ],
  };
  
  const question2 = {
    text: "How would you rate today's mood on a scale from 1-10?",
    options: [],
  };
  
  for (let i = 1; i <= 10; i++) {
    question2.options.push({ value: i, label: i });
  }
  
  const question3 = {
    text: "Describe why you are feeling this way today.",
    inputType: "textarea",
  };
  
  const questionsTemplate = Handlebars.compile(document.getElementById("questions-template").innerHTML);
  document.getElementById("questions-container").innerHTML = questionsTemplate({
    questions: [question1, question2, question3],
  });