"""
Defines the Thai Linguistic Registers for the TTS Engine.
This module helps the model select the correct pitch variance and speed.
"""

REGISTERS = {
    "FORMAL": {
        "pitch_scale": 1.0,
        "speed_scale": 0.95,
        "pause_length": "long",
        "description": "ภาษาทางการ: Use for announcements and corporate identity."
    },
    "SEMI_FORMAL": {
        "pitch_scale": 1.05,
        "speed_scale": 1.0,
        "pause_length": "medium",
        "description": "กึ่งทางการ: Professional yet approachable, typical for YouTube tutorials."
    },
    "CASUAL": {
        "pitch_scale": 1.1,
        "speed_scale": 1.15,
        "pause_length": "short",
        "description": "ภาษาปาก: Fast-paced, high pitch variance, includes slang support."
    },
    "STREET": {
        "pitch_scale": 1.2,
        "speed_scale": 1.25,
        "pause_length": "dynamic",
        "description": "ภาษาวัยรุ่น: High energy, mimics 'T-Pop' or 'TikTok' influencer style."
    }
}