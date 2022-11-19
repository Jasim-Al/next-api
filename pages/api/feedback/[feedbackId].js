import { getFilePath, readData } from ".";

export default function handler(req, res) {
  const { feedbackId } = req.query;

  const filePath = getFilePath();
  const data = readData(filePath);

  const feedback = data.find((item) => item.id === feedbackId);

  res.status(200).json({ feedback });
}
