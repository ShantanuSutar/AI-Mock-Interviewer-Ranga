import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };
  return (
    <div className="a border shadow-md rounded-lg p-3 ">
      <h3 className=" text-lg font-bold capitalize">
        {interview?.jobPosition}
      </h3>
      <h3 className=" text-base text-gray-700 ">
        {interview?.jobExperience} Years of Experience
      </h3>
      <h3 className=" text-sm mt-6 text-gray-500">
        Created At: {interview.createdAt}
      </h3>
      <div className=" flex justify-between mt-2 gap-5">
        <Button
          onClick={onFeedback}
          className={"w-full "}
          size="sm"
          variant="outline"
        >
          Feedback
        </Button>
        <Button onClick={onStart} className={"w-full "} size="sm">
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
