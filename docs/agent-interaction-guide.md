# Agent Interaction Guide: Script to Production Plan

## Workflow Logic
1.  **Ingestion:** The user uploads a `.docx` or `.pdf` of a Thai script.
2.  **Phaya Splitter:** Identifies where scenes start and end. It uses a custom Thai regex to find keywords like "ฉากที่", "สถานที่", and "เวลา".
3.  **Krueang-Prung:** Scans the dialogue and action lines. If the text says "แม่หยิบปิ่นโตออกมา", it automatically tags "ปิ่นโต" (Pinto) as a Hero Prop.
4.  **Mum-Klong:** Suggests visual styles. If the script is a "Lakorn", it suggests soft lighting and high-angle shots for villain reveals.
5.  **Mae-Ban:** The final sanity check. It looks at the location (e.g., "Bang Kapi") and suggests a call time that avoids peak traffic hours, a unique feature for the Thai market.

## Human-in-the-Loop (HITL)
The UI provides a "Production Dashboard" where the Producer can override AI suggestions before exporting to a PDF Call Sheet.