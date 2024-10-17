import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customErrors";
import logger from "../utils/logger";

const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  // หากเป็นข้อผิดพลาดทั่วไป ให้แปลงเป็น CustomError
  const errorToLog =
    err instanceof CustomError ? err : new CustomError(statusCode, err.message);

  // บันทึกข้อความ error พร้อมชื่อฟังก์ชันที่เกิดปัญหา
  logger.error(
    `Error in ${req.method} ${req.url}: ${
      errorToLog.message
    } - Status: ${statusCode} ${
      errorToLog.payload ? `- ${errorToLog.payload}` : ""
    }`
  );

  res.status(statusCode).json({
    name: errorToLog.name,
    message: errorToLog.message,
    statusCode: statusCode,
  });
};

export default errorHandler;
