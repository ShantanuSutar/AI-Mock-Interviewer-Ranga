import { Button } from "@/components/ui/button";
import { Lightbulb, Volume2, Volume2Icon } from "lucide-react";

function QuestionsSection({ mockInterviewQuestion = [], activeQuestionIndex }) {
  const questionNote =
    "Click on record answer when you want to answer the question. At the end of the interview we will give you the feedback along with the correct answer for each question to compare";

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text to speech !");
    }
  };

  return (
    <div className="a p-5 border-r    mt-5 rounded-lg">
      <div className="a grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={` p-2 bg-secondary rounded-full text-sm md:text-base text-center ${
              activeQuestionIndex === index ? " bg-slate-950 text-white" : ""
            }`}
            style={{
              backgroundColor: activeQuestionIndex === index ? " " : "",
            }}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className="a my-10 bg-slate-200 p-4 rounded-md text-base md:text-lg">
        <span className=" text-xl  font-semibold">Q.</span>{" "}
        {mockInterviewQuestion[activeQuestionIndex] &&
          mockInterviewQuestion[activeQuestionIndex].question}
      </h2>

      <Button
        variant="outline"
        className=" flex items-center gap-2"
        onClick={() =>
          textToSpeech(mockInterviewQuestion[activeQuestionIndex].question)
        }
      >
        <Volume2Icon className=" cursor-pointer" />
        Read the question
      </Button>
      <div className=" border rounded-lg p-5 bg-slate-50 mt-20">
        <h2 className="a text-lg flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note: </strong>
        </h2>
        <p className="">{questionNote}</p>
      </div>
    </div>
  );
}

export default QuestionsSection;
