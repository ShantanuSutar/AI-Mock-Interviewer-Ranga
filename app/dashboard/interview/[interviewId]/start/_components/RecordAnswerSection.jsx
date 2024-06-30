import { Button } from "@/components/ui/button";
import { Mic, WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="  mt-5 p-5 flex h-auto flex-col items-center justify-center gap-10">
      <div className=" flex items-center justify-center">
        <WebcamIcon
          width={300}
          height={300}
          className=" absolute  p-24 my-7 bg-slate-100 rounded-lg "
        />
        <Webcam className=" w-full h-80 z-10 " mirrored={true} />
      </div>
      <Button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        className=""
      >
        {isRecording ? (
          <h2 className="a items-center text-red-500 flex gap-2">
            <Mic size={20} /> <span>Stop Recording</span>
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button
        onClick={() => console.log(userAnswer)}
        className=" bg-gray-500 text-white"
      >
        Show user answer
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
