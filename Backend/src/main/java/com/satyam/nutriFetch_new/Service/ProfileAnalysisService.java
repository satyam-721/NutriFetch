package com.satyam.nutriFetch_new.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class ProfileAnalysisService {

    private final Client client;

    public ProfileAnalysisService(Client client) {
        this.client = client;
    }

    public String analyzeProfile(String profile){
        String prompt = "You are a nutrition calculation engine. Your task is to take a JSON input and return ONLY a JSON output with calculated daily nutritional requirements. Do not include explanations, text, or formatting outside JSON.\n" +
                "\n" +
                "\n" +
                "\n" +
                "Input JSON :" + profile + "Rules and formulas (STRICT, deterministic, no variation):\n" +
                "\n" +
                "\n" +
                "\n" +
                "1. Calculate BMR using Mifflin-St Jeor Equation:\n" +
                "\n" +
                "\n" +
                "\n" +
                "male: BMR = (10 × weight) + (6.25 × height) − (5 × age) + 5\n" +
                "\n" +
                "female: BMR = (10 × weight) + (6.25 × height) − (5 × age) − 161\n" +
                "\n" +
                "\n" +
                "\n" +
                "2. Activity multiplier:\n" +
                "\n" +
                "\n" +
                "\n" +
                "* sedentary = 1.2\n" +
                "\n" +
                "* light = 1.375\n" +
                "\n" +
                "* moderate = 1.55\n" +
                "\n" +
                "* active = 1.725\n" +
                "\n" +
                "\n" +
                "\n" +
                "TDEE = BMR × activity_multiplier\n" +
                "\n" +
                "\n" +
                "\n" +
                "3. Goal adjustment:\n" +
                "\n" +
                "\n" +
                "\n" +
                "* LossWeight → calories = TDEE − 400\n" +
                "\n" +
                "* maintain → calories = TDEE\n" +
                "\n" +
                "* GainMuscle → calories = TDEE + 400\n" +
                "\n" +
                "\n" +
                "\n" +
                "4. Protein (grams):\n" +
                "\n" +
                "\n" +
                "\n" +
                "* LossWeight → 1.5 × weight\n" +
                "\n" +
                "* maintain → 1.4 × weight\n" +
                "\n" +
                "* GainMuscle → 1.8 × weight\n" +
                "\n" +
                "\n" +
                "\n" +
                "5. Fat (grams):\n" +
                "\n" +
                "\n" +
                "\n" +
                "* All goals → 0.8 × weight\n" +
                "\n" +
                "\n" +
                "\n" +
                "6. Carbs (grams):\n" +
                "\n" +
                "\n" +
                "\n" +
                "* Remaining calories after protein and fat:\n" +
                "\n" +
                "  carbs = (calories − (protein × 4 + fat × 9)) / 4\n" +
                "\n" +
                "\n" +
                "\n" +
                "7. Fiber (grams):\n" +
                "\n" +
                "\n" +
                "\n" +
                "* fiber = (calories / 1000) × 14\n" +
                "\n" +
                "\n" +
                "\n" +
                "8. Final rules:\n" +
                "\n" +
                "\n" +
                "\n" +
                "* Round all values to nearest whole number\n" +
                "\n" +
                "* Output must be EXACT JSON only (no explanation, no text)\n" +
                "\n" +
                "\n" +
                "\n" +
                "Output JSON format:\n" +
                "\n" +
                "{\n" +
                "\n" +
                "\"calories\": number,\n" +
                "\n" +
                "\"protein\": number,\n" +
                "\n" +
                "\"carbs\": number,\n" +
                "\n" +
                "\"fat\": number,\n" +
                "\n" +
                "\"fiber\": number\n" +
                "\n" +
                "}\n" +
                "\n";
        GenerateContentResponse response =
            client.models.generateContent(
                    "gemini-2.5-flash",
                    prompt,
                    null
            );
        return response.text();
    }
}
