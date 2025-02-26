
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

async function analyzeLandingPage(url) {
  try {
    // Fetch page content
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract key elements
    const pageContent = {
      title: $('title').text(),
      h1Headers: $('h1').map((_, el) => $(el).text()).get(),
      mainCTA: $('button, .cta, a.button').first().text(),
      heroText: $('.hero, header, [class*="hero"]').text(),
      features: $('[class*="feature"]').map((_, el) => $(el).text()).get(),
      socialProof: $('[class*="social"], [class*="proof"], [class*="testimonial"]').text(),
    };

    // Load guidelines
    const guidelines = await fs.readFile(
      path.join(__dirname, '../utils/landing-page-guidelines.md'),
      'utf8'
    );

    // Construct LLM prompt using BeeAI framework
    const prompt = `
<context>
I am analyzing a landing page against established best practices.

Landing page content:
${JSON.stringify(pageContent, null, 2)}

Guidelines:
${guidelines}
</context>

<goal>
Assess how well this landing page follows best practices and provide specific recommendations for improvement.
</goal>

<constraints>
- Focus on the key principles: Desire - (Labor + Confusion)
- Evaluate each essential element listed in the guidelines
- Provide actionable recommendations
</constraints>

<examples>
Good header: "Groceries delivered in 1 hour"
Bad header: "Revolutionize your shopping"

Good CTA: "Start learning now"
Bad CTA: "Click here"
</examples>

<output_format>
{
  "score": 1-10,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "recommendations": ["..."]
}
</output_format>`;

    return prompt;
  } catch (error) {
    console.error('Error analyzing landing page:', error);
    throw error;
  }
}

module.exports = { analyzeLandingPage };
