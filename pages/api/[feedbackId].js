import { getFilePath, readData } from "./feedback";

export default function handler(req, res) {
  const { feedbackId } = req.query;

  const filePath = getFilePath();
  const data = readData(filePath);

  const feedback = data.filter((item) => item.id === feedbackId)[0];

  console.log(feedback);

  res.status(200).json(feedback);
}
