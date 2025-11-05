import express, { Request, Response } from "express";

export async function registerUser(req: Request, res: Response) {
  console.log("req.body", req.body);
}
