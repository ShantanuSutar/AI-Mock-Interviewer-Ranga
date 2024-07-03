"use client";
import { db } from "@/utils/db";
import { userAnswerSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getFeedback = async () => {
    const results = await db
      .select()
      .from(userAnswerSchema)
      .where(eq(userAnswerSchema.mockIdRef, params.interviewId))
      .orderBy(userAnswerSchema.id);

    setLoading(false);
    console.log(results);
    setFeedbackList(results);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  if (loading)
    return (
      <div className="p-10">
        <h2 className=" text-4xl font-bold text-gray-600">Feedback :-</h2>
        <h2 className=" text-lg my-4">Loading ...</h2>
      </div>
    );
  return (
    <div className="a p-10">
      {feedbackList?.length < 1 ? (
        <>
          <h2 className=" text-4xl font-bold text-gray-600">
            No feedback available !
          </h2>
          <h2 className=" text-lg my-4">
            You did not answer any of the given questions ...
          </h2>
        </>
      ) : (
        <>
          <h2 className=" text-4xl font-bold text-gray-600">
            Congratulations !!!
          </h2>
          <h2 className=" font-bold text-2xl">
            Here is your interview feedback
          </h2>

          <h2 className="  text-lg my-5">
            Your overall interview rating: <strong>7/10</strong>
          </h2>
          <h2 className=" text-base mb-4 text-gray-500">
            Find below interview question with correct answer, your answer and
            feedback for improvement.
          </h2>

          {feedbackList.length > 0 &&
            feedbackList.map((item, index) => {
              return (
                <Collapsible className=" w-full mt-7" key={index}>
                  <CollapsibleTrigger className=" w-full flex items-center justify-between gap-4 p-2  bg-gray-800 text-white my-2 text-left rounded-lg">
                    <p className=" w-[90%]">
                      <strong>Q. </strong>
                      {item.question}
                    </p>
                    <ChevronsUpDown className=" w-fit h-fit items-center justify-center" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className=" mb-10">
                    <div className=" border rounded-lg">
                      <h2 className="a text-gray-900  p-2 ">
                        <strong> Rating: </strong>
                        {item.rating}
                      </h2>
                      <h2 className="a text-gray-900  p-2  bg-gray-100">
                        <strong>Your Answer: </strong>
                        {item.userAns}
                      </h2>
                      <h2 className="a text-gray-900  p-2  bg-gray-300">
                        <strong>Correct Answer: </strong>
                        {item.correctAns}
                      </h2>
                      <h2 className="a text-gray-900 rounded-b-lg  p-2  bg-gray-400">
                        <strong>Feedback: </strong>
                        {item.feedback}
                      </h2>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
        </>
      )}

      <Button className={" my-10"} onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
