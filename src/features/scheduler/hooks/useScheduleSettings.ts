import { useState } from "react";

export const useScheduleSettings = () => {
  const [bufferBefore, setBufferBefore] = useState(30);
  const [bufferAfter, setBufferAfter] = useState(30);
  const [interviewDuration, setInterviewDuration] = useState(60);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  return {
    bufferBefore,
    setBufferBefore,
    bufferAfter,
    setBufferAfter,
    interviewDuration,
    setInterviewDuration,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  };
};
