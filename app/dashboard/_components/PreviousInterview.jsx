"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function PreviousInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(mockInterview)
      .where(
        eq(mockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(mockInterview.id));

    setLoading(false);
    // console.log(result);
    setInterviewList(result);
  };
  useEffect(() => {
    user && getUserInterviewList();
  }, [user]);

  if (loading) {
    return (
      <div className=" mt-16">
        <h2 className=" font-semibold text-xl my-4">Previous Interviews :-</h2>
        <h2>Loading ...</h2>
      </div>
    );
  }

  return (
    <div className="a mt-16">
      <h2 className=" font-semibold text-xl my-4">Previous Interviews :-</h2>

      {interviewList.length < 1 && (
        <div className=" text-lg   ">
          <h2>You have not yet attempted any mock interviews.</h2>
          <h2>Click on "Add New" button above to give one !</h2>
        </div>
      )}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {interviewList.length > 0 &&
          interviewList.map((interview, index) => {
            return <InterviewItemCard key={index} interview={interview} />;
          })}
      </div>
    </div>
  );
}

export default PreviousInterview;
