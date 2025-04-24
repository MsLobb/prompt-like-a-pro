
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const challenges = [
  {
    title: "Fix This Prompt",
    prompt: "Give ideas for classroom management.",
    instruction: "Revise this using the PREPARED framework. What role, explicit instructions, and parameters would improve it?",
    example: "You are an instructional coach using the Aguilar model. Develop five empathetic prompts to help a 9th-grade science teacher explore the link between personal beliefs and classroom management. Keep tone reflective and use bullet points.",
    input: true,
    scoreLogic: (input) => input.toLowerCase().includes("aguilar") && input.includes("9th-grade") ? 10 : 5
  },
  {
    title: "Choose the Best Prompt",
    prompt: "You’re coaching a 4th-grade teacher on improving reading fluency. Which of the following prompts is most effective?",
    options: [
      "Give tips to help this teacher.",
      "Act as a Sweeney-style coach. Analyze recent student fluency data and suggest 3 changes the teacher can make. Be student-centered and concise.",
      "Make reading more fun."
    ],
    answer: 1,
    input: true,
    scoreLogic: (input) => parseInt(input) === 1 ? 10 : 0
  },
  {
    title: "Prompt Remix",
    instruction: "Choose a coaching model and grade level, then write your own PREPARED-aligned prompt.",
    models: ["Sweeney", "Aguilar", "Knight"],
    subjects: ["4th-grade Reading", "7th-grade Math", "10th-grade Social Studies"],
    input: true,
    scoreLogic: (input) => input.length > 50 ? 10 : 5
  },
  {
    title: "Empathy & Bias Check",
    prompt: "Develop a feedback statement for a new ESL teacher struggling with lesson pacing.",
    reflection: [
      "Did your tone reflect empathy?",
      "Is your feedback actionable?",
      "Could bias be influencing how the teacher is portrayed?"
    ],
    input: true,
    scoreLogic: (input) => input.toLowerCase().includes("empathy") ? 10 : 6
  }
];

export default function PromptLikeAPro() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(challenges.length).fill(""));
  const [score, setScore] = useState(0);
  const challenge = challenges[current];
  const isLast = current === challenges.length - 1;

  const handleInputChange = (e) => {
    const updated = [...answers];
    updated[current] = e.target.value;
    setAnswers(updated);
  };

  const handleNext = () => {
    const challengeScore = challenge.scoreLogic ? challenge.scoreLogic(answers[current] || "") : 0;
    setScore(score + challengeScore);
    setCurrent((current + 1) % challenges.length);
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{challenge.title}</h2>
          {challenge.prompt && <p className="mb-2">{challenge.prompt}</p>}
          {challenge.instruction && <p className="mb-2 italic">{challenge.instruction}</p>}
          {challenge.options && (
            <ul className="list-disc pl-6">
              {challenge.options.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
          )}
          {challenge.example && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <strong>Example:</strong> {challenge.example}
            </div>
          )}
          {challenge.reflection && (
            <ul className="list-disc pl-6 mt-2">
              {challenge.reflection.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          )}
          {challenge.models && (
            <div className="mt-2">
              <p><strong>Coaching Models:</strong> {challenge.models.join(", ")}</p>
              <p><strong>Subjects:</strong> {challenge.subjects.join(", ")}</p>
            </div>
          )}
          {challenge.input && (
            <div className="mt-4">
              <Textarea
                placeholder="Type your response here..."
                value={answers[current]}
                onChange={handleInputChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button onClick={() => setCurrent((current - 1 + challenges.length) % challenges.length)}>Previous</Button>
        {!isLast ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={() => alert(`🎉 Your final score is ${score} out of 40! You’ve earned a Certificate of Mastery!`)}>
            Finish & Get Certificate
          </Button>
        )}
      </div>
      {isLast && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h3 className="text-lg font-semibold">🎓 Certificate of Mastery</h3>
          <p>Congratulations! You’ve completed the Prompt Like a Pro Game. Your total score: {score} / 40.</p>
          <p>You can now export this page as a PDF or embed the game on your school site via an iframe:</p>
          <code className="block mt-2 bg-white p-2 rounded border">&lt;iframe src="https://your-site.com/prompt-like-a-pro" width="100%" height="800"&gt;&lt;/iframe&gt;</code>
        </div>
      )}
    </div>
  );
}
