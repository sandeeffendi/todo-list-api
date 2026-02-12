import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All Field Are Required",
      });
    }

    const existing = await User.findOne({
      email,
    });

    if (existing) {
      return res.status(400).json({
        message: "Email Already Registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return res.status(400).json({
        status: res.statusCode,
        message: "Missing Required Fields",
      });
    }

    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(401).json({
        status: res.statusCode,
        message: "User Not Found.",
      });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({
        status: res.statusCode,
        message: "Invalid Password.",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      token: token,
      user: {
        userId: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: `Server Error: ${error}`,
    });
  }
};

export { register, login };
