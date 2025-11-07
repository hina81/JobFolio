import { useState } from "react";

export const useScheduleSettings = () => {
  const [bufferBefore, setBufferBefore] = useState(30);
  const [bufferAfter, setBufferAfter] = useState(30);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [outputFormat, setOutputFormat] = useState("bullets");

  return {
    bufferBefore,
    setBufferBefore,
    bufferAfter,
    setBufferAfter,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    outputFormat,
    setOutputFormat,
  };
};
