import { useRef, useState } from "react";

export default function Home() {
  const emailRef = useRef();
  const feedbackRef = useRef();
  const [feedbacks, setFeedbacks] = useState(null);

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email, feedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setFeedbacks((feedbacks) => [...feedbacks, data.feedback])
      );
  }

  function getFeedbacks() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data.feedbacks));
  }

  return (
    <div>
      <h1>The Home Page.</h1>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" ref={emailRef} name="email" id="email" />
        </div>

        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            name="feedback"
            ref={feedbackRef}
            id="feedback"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={getFeedbacks}>Load feedback</button>
      <div>
        <ul>
          {feedbacks &&
            feedbacks.map((feedback) => (
              <li key={feedback.id}>
                {feedback.email} - {feedback.feedback}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
