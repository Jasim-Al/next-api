import { useState } from "react";
import { readData, getFilePath } from "../api/feedback";

function FeedbackPage({ feedbacks }) {
  const [loadedFeedback, setLoadedFeedback] = useState("");

  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => setLoadedFeedback(data.feedback));
  }

  return (
    <div>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            {feedback.email} - {feedback.feedback}{" "}
            {loadedFeedback &&
              loadedFeedback.id === feedback.id &&
              new Date(feedback.id).toDateString()}
            <button onClick={loadFeedbackHandler.bind(this, feedback.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackPage;

export async function getStaticProps() {
  const filePath = getFilePath();
  const feedbacks = readData(filePath);
  return {
    props: { feedbacks },
  };
}
