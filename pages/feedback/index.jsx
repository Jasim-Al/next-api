import { readData, getFilePath } from "../api/feedback";

function FeedbackPage({ feedbacks }) {
  return (
    <div>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            {feedback.email} - {feedback.feedback}
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
