/**
 * Utility to handle specific Thai linguistic structures in scripts.
 * Ensures that "Sluglines" (ฉากที่) and "Dialogue" are correctly identified 
 * even when mixed with Thai colloquialisms.
 */
export class ThaiContextParser {
  static async formatToStandard(text: string): Promise<any> {
    // Regex for Thai Script Scenes: "ฉากที่ 1:", "INT. บ้าน - กลางวัน"
    const scenes = text.split(/ฉากที่|SCENE/i).filter(s => s.trim().length > 0);
    
    return scenes.map((scene, index) => {
      const lines = scene.split('\n').map(l => l.trim());
      return {
        sceneNumber: index + 1,
        heading: lines[0],
        description: lines.slice(1).filter(l => !l.includes(':')),
        dialogue: lines.filter(l => l.includes(':')).map(d => {
          const [character, speech] = d.split(':');
          return { character: character?.trim(), speech: speech?.trim() };
        })
      };
    });
  }

  /**
   * Checks for Thai-specific production keywords for automated tagging.
   */
  static extractKeywords(text: string): string[] {
    const keywords: string[] = [];
    if (text.includes("กรุงเทพ") || text.includes("ถนน")) keywords.push("Urban Bangkok");
    if (text.includes("ดราม่า") || text.includes("ร้องไห้")) keywords.push("Thai Melodrama");
    if (text.includes("ตลก") || text.includes("หักมุม")) keywords.push("Thai Humour");
    return keywords;
  }
}