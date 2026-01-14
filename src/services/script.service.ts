import { PrismaClient } from '@prisma/client';
import { ThaiContextParser } from '../lib/thai-context-parser';

const prisma = new PrismaClient();

export class ScriptService {
  /**
   * Processes a new script using the Phaya Thai LLM logic.
   * Breaks down Thai dialogue and scene headers specifically for Thai production standards.
   */
  async createScript(projectId: string, title: string, content: string) {
    // 1. Initial Parsing of Thai Script
    const formattedContent = await ThaiContextParser.formatToStandard(content);
    
    // 2. Trigger Background AI Breakdown (Async)
    // This would normally call the Agentic Workflow (Phaya Splitter)
    const script = await prisma.script.create({
      data: {
        projectId,
        title,
        rawMarkdown: content,
        content: formattedContent,
        version: 1,
      },
    });

    return script;
  }

  async getLatestScript(projectId: string) {
    return prisma.script.findFirst({
      where: { projectId },
      orderBy: { version: 'desc' },
    });
  }

  /**
   * Updates script and increments version, preserving Thai nuances in history.
   */
  async updateScript(scriptId: string, newContent: string) {
    const current = await prisma.script.findUnique({ where: { id: scriptId } });
    if (!current) throw new Error("Script not found");

    return prisma.script.create({
      data: {
        projectId: current.projectId,
        title: current.title,
        version: current.version + 1,
        rawMarkdown: newContent,
        content: await ThaiContextParser.formatToStandard(newContent),
      },
    });
  }
}