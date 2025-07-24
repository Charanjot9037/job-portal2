export async function POST(req) {
  try {
    const { jobDescription, model = "gemini-2.5-flash" } = await req.json();

    if (!jobDescription || jobDescription.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Job description is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const prompt = `
You are a resume optimization expert.

Analyze the following job description and produce a complete, nicely formatted HTML document with embedded CSS styles.

Job Description:
---
${jobDescription}
---

The HTML should include:
- A title and heading
- A short professional summary or cover letter intro
- Four resume bullet point
- Sections for key technical and soft skills required
- Basic Projects
- Advanced Projects

Please provide the full HTML document with backgroundcolor white, including <!DOCTYPE html>, <html>, <head> (with CSS), and <body> tags. No explanations or extra text outside the HTML .
    `;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error(`Gemini API error ${geminiRes.status}:`, errorText);
      return new Response(
        JSON.stringify({ error: `Gemini API error: ${errorText}` }),
        {
          status: geminiRes.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await geminiRes.json();
    const html = result?.candidates?.[0]?.content?.parts?.[0]?.text || "<p>No response from Gemini</p>";

    return new Response(
      JSON.stringify({ html }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Gemini error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
