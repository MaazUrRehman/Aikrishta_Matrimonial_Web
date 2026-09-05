import axios from "axios";

export const analyzeDocumentWithHive = async (imageUrl) => {
  try {
    const response = await axios.post(
      "https://api.thehive.ai/api/v3/chat/completions",
      {
        model: "hive/vision-language-model",
        max_tokens: 150,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `
Analyze this identity document for fraud.

Return ONLY in this format:

Overall Risk: Low/Medium/High
Confidence: %
Edited: Yes/No
Tampering: Yes/No
Blur: Yes/No
OCR Issues: Yes/No
Remarks: Short explanation.
                `,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HIVE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.log(error);
  }
};


export const parseHiveResponse = (hiveResponse) => {

  const content =
    hiveResponse?.choices?.[0]?.message?.content || "";

  const getValue = (label) => {
    const regex = new RegExp(`${label}:\\s*(.*)`, "i");
    const match = content.match(regex);
    return match ? match[1].trim() : "";
  };

  return {
    overallRisk: getValue("Overall Risk"),
    confidence: Number(getValue("Confidence").replace("%", "")) || 0,
    edited: getValue("Edited"),
    tampering: getValue("Tampering"),
    blur: getValue("Blur"),
    ocrIssues: getValue("OCR Issues"),
    remarks: getValue("Remarks"),
    rawResponse: content,
  };
};