import Call from "../models/Call";

export const createCall = async (
  meetingId: string,
  title?: string,
  participants: string[] = []
) => {
  const existingCall = await Call.findOne({ meetingId });
  if (existingCall) {
    throw new Error("Meeting ID already exists");
  }

  const newCall = new Call({
    meetingId,
    title: title || "Untitled Call", // Default title if not provided
    participants,
  });

  await newCall.save();
  return newCall;
};

export const endCall = async (meetingId: string) => {
  const call = await Call.findOne({ meetingId });
  if (!call) return null;

  call.endedAt = new Date();
  call.duration = (call.endedAt.getTime() - call.startedAt.getTime()) / 1000;
  call.status = "ended";
  return await call.save();
};

export const getCallHistory = async (userId: string) => {
  return await Call.find({ participants: userId })
    .populate("participants")
    .sort({ createdAt: -1 });
};
