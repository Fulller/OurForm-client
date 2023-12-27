const multiple_choice = {
  _id: "question_id",
  type: "multiple_choice",
  title: "Tại sao trái đât lại quay? Là do ...",
  image:
    "https://www.thefactsite.com/wp-content/uploads/2015/02/planet-earth-facts.webp",
  required: false,
  score: 12,
  has_answer: false,
  data: {
    _id: "data_id",
    multiple_choice: {
      _id: "multiple_choice_id",
      question_data: [
        {
          _id: "option_id1",
          text: "Tại gió",
        },
        {
          _id: "option_id2",
          text: "Tại từ tường",
        },
        {
          _id: "option_id3",
          text: "Do ánh sáng mặt trời",
        },
        {
          _id: "option_id4",
          text: "Do mặt trăng",
        },
      ],
      answer_data: "option_id3",
    },
  },
};
export { multiple_choice };
