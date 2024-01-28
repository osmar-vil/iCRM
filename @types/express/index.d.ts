import { token } from "../../src/types/auth";

export {};

declare global {
  namespace Express {
    interface Request {
      auth: token;
    }
  }
}