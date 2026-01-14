import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

app = FastAPI(title="TCAI Orchestrator")

# Configuration for Phaya Thai LLM (Hosted on Private GPU Cluster)
PHAYA_THAI_ENDPOINT = os.getenv("PHAYA_THAI_MODEL_ENDPOINT", "http://localhost:8000/v1")

class ScriptRequest(BaseModel):
    brief: str
    tone: str  # e.g., "Khum-Phua-Phan", "Formal Thai", "Teen Slang"
    platform: str # e.g., "TikTok", "TVC"

@app.post("/v1/generate-script")
async def generate_thai_script(request: ScriptRequest):
    """
    Orchestrates the script generation by injecting Thai cultural context
    and using the Phaya Thai fine-tuned model.
    """
    try:
        # 1. Define Thai-specific prompt logic
        template = """
        You are an expert Thai Creative Director. 
        Context: {brief}
        Tone: {tone}
        Platform: {platform}
        
        Requirement: Generate a production-ready script in Thai. 
        Ensure nuances like 'Krap/Ka' and local slang are used correctly for the {tone} register.
        """
        
        prompt = PromptTemplate(
            input_variables=["brief", "tone", "platform"],
            template=template
        )

        # 2. Connect to local Phaya Thai LLM
        llm = ChatOpenAI(
            base_url=PHAYA_THAI_ENDPOINT,
            api_key="internal-secret",
            model="phaya-thai-70b-v1"
        )

        chain = LLMChain(llm=llm, prompt=prompt)
        
        # 3. Execution
        response = await chain.arun(
            brief=request.brief,
            tone=request.tone,
            platform=request.platform
        )
        
        return {"status": "success", "script": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)