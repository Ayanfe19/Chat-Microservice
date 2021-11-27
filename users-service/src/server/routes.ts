import { Express } from "express";
import { getRepository } from "typeorm";

import User from "#root/db/entities/User";
import { nextTick } from "process";

const setupRoutes = (app: Express) => {
   const userRepository = getRepository(User);

   app.post("/sessions", async (req, res, next) => {
      if (!req.body.username || !req.body.password) {
         return next(new Error("Invalid body!"));
      }

      try {
         const user = await userRepository.findOne(
            {
               username: req.body.username,
            },
            {
               select: ["id", "passwordHash"],
            }
         );

         if (!user) return next(new Error("Invalid username!"));
      }  catch (err) {
         return next(err);
      }
   });

   app.get("/users/:userId", async (req, res, next) => {
       try {
          const user = await userRepository.findOne(req.params.userId);

          if (!user) return next(new Error("Invalid user ID!"));

          return res.json(user);
       } catch (err) {
          return next(err);
       }
    });
 };

export default setupRoutes;