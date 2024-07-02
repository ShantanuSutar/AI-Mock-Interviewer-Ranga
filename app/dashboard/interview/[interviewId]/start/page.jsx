"use client";
import { db } from "@/utils/db";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { mockInterview } from "@/utils/schema";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    // console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, params.interviewId));

    const jsonMockRes = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockRes);
    console.log(result[0]);

    setInterviewData(result[0]);
    setMockInterviewQuestion(jsonMockRes);
  };
  return (
    <div>
      <div className=" grid grid-cols-1 lg:grid-cols-2">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video and audio recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className=" flex w-full  lg:w-[50%]   lg:ml-auto gap-6 mb-10 justify-center ">
        <Button
          onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
          disabled={activeQuestionIndex < 1}
          className=" disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          Previous Question
        </Button>
        <Button
          onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
          disabled={activeQuestionIndex === mockInterviewQuestion?.length - 1}
          className=" disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          Next Question
        </Button>
        <Link
          href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
        >
          <Button
            disabled={activeQuestionIndex !== mockInterviewQuestion?.length - 1}
            className=" disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            End Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default StartInterview;
