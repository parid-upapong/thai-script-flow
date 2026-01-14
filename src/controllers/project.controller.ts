import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response) => {
  try {
    const { workingTitle, productionType, toneAndMood, agencyName } = req.body;

    const project = await prisma.project.create({
      data: {
        workingTitle,
        productionType,
        toneAndMood,
        agencyName,
        // Default collaborator is the creator (AD/Producer role)
        collaborators: {
          create: {
            userId: req.user.id,
            role: 'PRODUCER',
          }
        }
      },
    });

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectDashboard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      scripts: { orderBy: { updatedAt: 'desc' }, take: 1 },
      assets: { take: 10 },
      collaborators: true,
    },
  });

  if (!project) return res.status(404).json({ message: "ไม่พบโปรเจกต์ที่ระบุ" });

  return res.json(project);
};