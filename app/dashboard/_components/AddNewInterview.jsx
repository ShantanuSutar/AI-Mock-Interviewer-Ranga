"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/geminiAiModel";
import { useState } from "react";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(jobDesc, jobExperience, jobPosition);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of experience: ${jobExperience}

    Based on above info, give me five interview questions with answers in json format

    Give question and answer as field in json`;

    const result = await chatSession.sendMessage(InputPrompt);

    const MockResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log(result.response.text());

    console.log(JSON.parse(MockResponse));
    setJsonResponse(MockResponse);
    setLoading(false);
  };

  return (
    <div>
      <div
        className="a p-10 border rounded-lg bg-secondary hover:scale-105 cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" font-semibold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className=" max-w-fit">
          <DialogHeader className=" flex flex-col gap-2">
            <DialogTitle className="a font-bold text-2xl">
              Tell us more about your job interview
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div>
              <h2>
                Add details about Job Positon/Role, Job Description and years of
                experience
              </h2>
              <div className=" mt-7 my-3 flex gap-2 flex-col">
                <label>Job Role / Job Position</label>
                <Input
                  onChange={(e) => setJobPosition(e.target.value)}
                  required
                  placeholder="E.g. Frontend Developer"
                />
              </div>
              <div className="   my-3 flex gap-2 flex-col">
                <label>Job Description / Tech Stack</label>
                <Textarea
                  onChange={(e) => setJobDesc(e.target.value)}
                  required
                  placeholder="E.g. React, Javascript, Nextjs"
                />
              </div>
              <div className=" mt-3 my-3 flex gap-2 flex-col">
                <label>Years of experience</label>
                <Input
                  onChange={(e) => setJobExperience(e.target.value)}
                  required
                  type="number"
                  placeholder="E.g. 2"
                  min={0}
                  max={20}
                />
              </div>
            </div>
            <div className=" flex gap-4 mt-8 justify-end">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              {!loading ? (
                <Button type="submit">Start Interview</Button>
              ) : (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
