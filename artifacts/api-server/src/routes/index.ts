import { Router, type IRouter } from "express";
import healthRouter from "./health";
import studentsRouter from "./students";
import semestersRouter from "./semesters";
import topicsRouter from "./topics";
import assignmentsRouter from "./assignments";
import projectsRouter from "./projects";
import certificatesRouter from "./certificates";
import portfolioRouter from "./portfolio";
import leaderboardRouter from "./leaderboard";
import jobsRouter from "./jobs";
import companiesRouter from "./companies";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(studentsRouter);
router.use(semestersRouter);
router.use(topicsRouter);
router.use(assignmentsRouter);
router.use(projectsRouter);
router.use(certificatesRouter);
router.use(portfolioRouter);
router.use(leaderboardRouter);
router.use(jobsRouter);
router.use(companiesRouter);
router.use(dashboardRouter);

export default router;
