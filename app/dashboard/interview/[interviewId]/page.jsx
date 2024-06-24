"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const testInfo = {
    info: "Enable webcam and microphone to start the interview. It has 5 questions. After completing the interview, you will get a report of your performance on the basis of answers given.",
    note: "We do not record your video / webcam, you can disable it any time !",
  };

  useEffect(() => {
    // console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  console.log(interviewData);

  return (
    <div className=" my-10 flex justify-center flex-col items-center">
      <h2 className=" font-bold text-4xl">Let's get started</h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <div className=" flex flex-col gap-10">
          <div className=" bg-slate-100 p-8 rounded-md  mt-16 flex flex-col gap-2 h-fit xl:w-[90%] w-full justify-self-center  ">
            <div className=" flex items-center justify-between mb-4">
              <hr className=" border-black w-full" />
              <h1 className=" mx-4 text-xl font-semibold text-center ">
                Summary
              </h1>
              <hr className="border-black w-full" />
            </div>
            <div className=" flex flex-col gap-4 mt-2 text-[17px]">
              <h2>
                <span className=" font-semibold">
                  Job Role / Job Position:{" "}
                </span>
                {interviewData?.jobPosition}
              </h2>
              <h2>
                <span className=" font-semibold">
                  Job Description / Tech Stack:{" "}
                </span>
                {interviewData?.jobDesc}
              </h2>
              <h2>
                <span className=" font-semibold">Years of Experience: </span>
                {interviewData?.jobExperience}
              </h2>
            </div>
          </div>
          <div
            className=" xl:w-[90%] w-full border-yellow-300 border bg-yellow-100  text-yellow-500 p-8 flex flex-col gap-4 rounded-md
          "
          >
            <h2 className=" flex items-center gap-2 text-lg">
              <Lightbulb size={30} />
              <span className="a font-semibold">Information</span>
            </h2>
            <div className="">
              <h2>{testInfo.info}</h2>
              <h2 className=" mt-2">
                {" "}
                <strong>Note:</strong> {testInfo.note}
              </h2>
            </div>
          </div>
        </div>
        <div className=" w-fit h-fit flex justify-self-center flex-col mt-8">
          <div className="">
            {webCamEnabled ? (
              <div className=" flex flex-col">
                <Webcam
                  className=" w-96 h-80"
                  mirrored={true}
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                />
                <Button
                  variant="destructive"
                  onClick={() => setWebCamEnabled(false)}
                >
                  Disable Web Cam and Microphone
                </Button>
              </div>
            ) : (
              <div className=" flex flex-col">
                <WebcamIcon className="  w-80 h-80 p-28 my-7 bg-slate-100 rounded-lg " />
                <Button
                  variant="outline"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Web Cam and Microphone
                </Button>
              </div>
            )}
          </div>
          <div className=" w-full flex mt-6 justify-end">
            <Button>Start Interview</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
