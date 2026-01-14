import { Router } from 'express';
import * as ProjectController from '../controllers/project.controller';
import { ScriptService } from '../services/script.service';

const router = Router();
const scriptService = new ScriptService();

// Project Management
router.post('/projects', ProjectController.createProject);
router.get('/projects/:id', ProjectController.getProjectDashboard);

// Scripts & Creative Content
router.post('/projects/:id/scripts', async (req, res) => {
  const { title, content } = req.body;
  const script = await scriptService.createScript(req.params.id, title, content);
  res.json(script);
});

// Assets & Storyboards
router.get('/projects/:id/assets', async (req, res) => {
  const assets = await prisma.asset.findMany({
    where: { projectId: req.params.id }
  });
  res.json(assets);
});

export default router;