import { Request, Response } from "express";
import { getUserById, getUsers } from "../services/Users";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (
  req: Request<{
    id: any;
  }>,
  res: Response<any>
) => {
  try {
    const user: any = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
