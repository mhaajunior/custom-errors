import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/customErrors";
import { getUserById } from "../models/user.model";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      // ถ้า id ไม่ใช่ตัวเลข ให้โยน BadRequestError
      throw new BadRequestError("Invalid user ID format");
    }

    const user = getUserById(id);

    if (!user) {
      // ถ้าไม่พบผู้ใช้ ให้โยน NotFoundError
      throw new NotFoundError(`User with ID ${id} not found`);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    if (!name) {
      // ถ้าไม่มีการส่งชื่อผู้ใช้มา ให้โยน BadRequestError
      throw new BadRequestError(
        "User name is required",
        JSON.stringify(req.body)
      );
    }

    // สมมติว่าการตรวจสอบสิทธิ์ไม่ผ่าน
    const isAuthorized = false; // เปลี่ยนเป็นจริงถ้าผู้ใช้ผ่านการตรวจสอบ
    if (!isAuthorized) {
      throw new UnauthorizedError("You are not authorized to create users");
    }

    // สมมติว่าผู้ใช้ถูกสร้าง
    res.status(201).json({ message: "User created", user: { id: 2, name } });
  } catch (error) {
    next(error);
  }
};
