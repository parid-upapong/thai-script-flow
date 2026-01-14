# Audio Synthesis Pipeline: Thai Neural TTS for Production

## 1. Overview
The TCAI Voice Engine is designed to bridge the gap between flat robotic voices and the expressive requirements of Thai media production. It utilizes a **Multi-Speaker VITS (Variational Inference with adversarial learning for end-to-end Text-to-Speech)** architecture, fine-tuned on Thai creative registers.

## 2. Key Features
*   **Register-Aware Synthesis:** Automatically adjusts prosody based on the Thai register (ทางการ, กึ่งทางการ, ภาษาปาก).
*   **Tone-Consistency Module:** Prevents "Tone Drift" in long sentences, a common issue in Thai TTS.
*   **Automatic Script Parsing:** Detects speaker tags (e.g., "AD-1:", "Narrator:") and assigns voices based on the script breakdown.
*   **Animatic Sync (Word-level Timestamps):** Exports JSON metadata for each word to sync with storyboard frames.

## 3. Voice Profiles (The "Identity" Set)
| Voice ID | Name | Tone/Mood | Best For |
| :--- | :--- | :--- | :--- |
| `th-f-pro-01` | Khun Malee | Professional, Warm | Corporate TVC, Documentary |
| `th-m-casual-02` | Tee | Gen Z, Energetic, Slang-friendly | TikTok, YouTube Vlogs |
| `th-f-hype-03` | Janny | High-energy, Sales-focused | Flash Sale, Promotion VTR |
| `th-m-deep-04` | Uncle Somchai | Gritty, Experienced | Drama, Cinematic Trailers |

## 4. Integration with Production Workflow
1. **Script Intake:** Receives JSON from the "Phaya Splitter" Agent.
2. **Phonemization:** Converts Thai script to IPA (International Phonetic Alphabet) including tone marks.
3. **Inference:** Generates WAV/MP3 via the GPU cluster.
4. **Metadata Generation:** Outputs `.json` timestamps for storyboard synchronization.