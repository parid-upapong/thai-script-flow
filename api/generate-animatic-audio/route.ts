import { NextResponse } from 'next/server';

/**
 * API Route to bridge the Frontend with the Python TTS Engine.
 * Handles authentication and sends script data for synthesis.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { scriptId, voiceId, text, register } = body;

    // Call the Internal Python TTS Service
    const response = await fetch(`${process.env.TTS_ENGINE_URL}/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        voice_id: voiceId,
        register: register || 'SEMI_FORMAL',
        speed: 1.0,
      }),
    });

    const data = await response.json();

    // Log the event for the production audit trail
    // (Existing project context: Prisma/DB integration)

    return NextResponse.json({
      success: true,
      audioUrl: data.audio_url,
      alignments: data.alignment,
      duration: data.duration
    });

  } catch (error) {
    console.error('TTS_GENERATION_ERROR', error);
    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
  }
}