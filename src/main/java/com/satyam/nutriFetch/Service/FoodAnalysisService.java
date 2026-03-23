package com.satyam.nutriFetch.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class FoodAnalysisService {

    private final Client client;

    public FoodAnalysisService(Client client) {
        this.client = client;
    }

    public String analyzeProduct(String url) {
        String prompt = url+"\n\n" +
                "Your task is to extract product data and return ONLY a JSON object in the exact structure below. Do not include explanations, notes, markdown, or any extra text.\n\n" +
                "Strict rules:\n" +
                "- Output ONLY valid JSON.\n" +
                "- Do not add or remove any fields.\n" +
                "- Nutrients must include ONLY: calories, protein, carbs, fats, sugar, sodium, fiber.\n" +
                "- Use numbers (no units, no strings like \"g\" or \"kcal\").\n" +
                "- If any value is missing, estimate reasonably based on similar products.\n" +
                "- ingredients must be an array of strings.\n" +
                "- alerts must be an array of objects with ONLY: type, message, severity.\n" +
                "- You may include multiple ingredients and alerts.\n" +
                "- healthScore must be a number between 0–100 based on overall nutritional quality.\n\n" +
                "Format:\n" +
                "{\n" +
                "  \"name\": \"string\",\n" +
                "  \"brand\": \"string\",\n" +
                "  \"nutrients\": {\n" +
                "    \"calories\": number,\n" +
                "    \"protein\": number,\n" +
                "    \"carbs\": number,\n" +
                "    \"fats\": number,\n" +
                "    \"sugar\": number,\n" +
                "    \"sodium\": number,\n" +
                "    \"fiber\": number\n" +
                "  },\n" +
                "  \"ingredients\": [\"string\"],\n" +
                "  \"healthScore\": number,\n" +
                "  \"alerts\": [\n" +
                "    {\n" +
                "      \"type\": \"string\",\n" +
                "      \"message\": \"string\",\n" +
                "      \"severity\": \"low | warning | high\"\n" +
                "    }\n" +
                "  ]\n" +
                "}\n\n" +
                "Return ONLY the JSON.";

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null
                );

        return response.text();
    }
}