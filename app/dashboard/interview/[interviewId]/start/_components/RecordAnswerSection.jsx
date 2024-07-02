import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/geminiAiModel";
import { userAnswerSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic, WebcamIcon } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const { user } = useUser();
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      // if (userAnswer.length < 10) {
      //   setLoading(false);
      //   toast("Error while saving your answer, please record again !");
      //   return;
      // }
    } else {
      startSpeechToText();
    }
  };

  const updateUserAns = async () => {
    setLoading(true);
    console.log(userAnswer);
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex].question} , User answer: ${userAnswer} ,  Depends on question and user answer for given interview question. Please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.
    E.g - 
 {
   "rating": ,
   "feedback": ""
 }
 
 
 Give rating and feedback as field in json. Note: don't give me anything else not even comments.
 `;

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(mockJsonResp);
    const jsonFeedbackRes = JSON.parse(mockJsonResp);

    const res = await db.insert(userAnswerSchema).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: jsonFeedbackRes?.feedback,
      rating: jsonFeedbackRes?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (res) {
      toast("User answer recorded successfully !");
      setUserAnswer("");
    }
    setResults([]);
    setLoading(false);
  };

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAns();
    }
  }, [userAnswer]);

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="  pt-20  p-5 flex h-auto flex-col items-center gap-2">
      <div className=" flex items-center justify-center">
        <WebcamIcon
          width={300}
          height={300}
          className=" absolute  p-24 my-7 bg-slate-100 rounded-lg "
        />
        <Webcam className=" w-full h-80 z-10 " mirrored={true} />
      </div>
      <Button disabled={loading} onClick={startStopRecording} className=" mt-6">
        {isRecording ? (
          <h2 className="a items-center text-red-500 flex gap-2">
            <Mic size={20} /> <span>Stop Recording</span>
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      {/* <Button
        onClick={() => console.log(userAnswer)}
        className=" bg-gray-500 text-white"
      >
        Show user answer
      </Button> */}
    </div>
  );
}

export default RecordAnswerSection;
