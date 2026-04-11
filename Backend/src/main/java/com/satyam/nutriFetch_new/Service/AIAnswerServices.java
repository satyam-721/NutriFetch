package com.satyam.nutriFetch_new.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class AIAnswerServices {
    private final Client client;

    public AIAnswerServices(Client client) {
        this.client = client;
    }

    public String analyseData(String data){
        String prompt = "You are a strict nutrition analysis assistant.\n" +
                "\n" +
                "\n" +
                "\n" +
                "Your job is to answer the user's \"question\" based ONLY on the provided \"log\".\n" +
                "\n" +
                "\n" +
                "\n" +
                "INPUT:\n" +
                "\n" +
                "- question: user's query\n" +
                "\n" +
                "- log: daily food consumption data (JSON)\n" +
                "\n" +
                "\n" +
                "\n" +
                "RULES:\n" +
                "\n" +
                "1. Give SHORT, DIRECT, and POINT-WISE answers only.\n" +
                "\n" +
                "2. Do NOT explain unless asked.\n" +
                "\n" +
                "3. Do NOT add extra suggestions unless relevant to the question.\n" +
                "\n" +
                "4. Do NOT repeat the input.\n" +
                "\n" +
                "5. Use simple language.\n" +
                "\n" +
                "6. If calculation is needed, give final values only (no steps).\n" +
                "\n" +
                "7. If something is unhealthy or risky, state it clearly.\n" +
                "\n" +
                "8. If data is missing, say \"Insufficient data\".\n" +
                "\n" +
                "9. Stay strictly focused on the question.\n" +
                "\n" +
                "\n" +
                "\n" +
                "OUTPUT FORMAT:\n" +
                "\n" +
                "- Use bullet points only\n" +
                "\n" +
                "- No paragraphs\n" +
                "\n" +
                "- No emojis\n" +
                "\n" +
                "- No headings\n" +
                "\n" +
                "- No extra text before or after\n" +
                "\n" +
                "\n" +
                "\n" +
                "TONE:\n" +
                "\n" +
                "- Neutral, factual, slightly strict\n" +
                "\n" +
                "\n" +
                "\n" +
                "Now answer based on:\n" +
                "\n" +
                "question: {{question}}\n" +
                "\n" +
                "log: {{log}}\n" +
                "\n"+data;
        GenerateContentResponse response =
            client.models.generateContent(
                    "gemini-2.5-flash",
                    prompt,
                    null
            );
        return response.text();
    }
}
