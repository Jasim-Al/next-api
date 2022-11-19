// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

export function getFilePath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function readData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

export function writeData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, feedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const filePath = getFilePath();
    const data = readData(filePath);

    data.push(newFeedback);

    writeData(filePath, data);

    return res.status(201).json({ feedback: newFeedback });
  } else {
    const filePath = getFilePath();
    const data = readData(filePath);
    return res.status(200).json({ feedbacks: data });
  }
}
