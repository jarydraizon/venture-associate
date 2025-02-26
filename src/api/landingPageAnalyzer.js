
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeLandingPage(url) {
  try {
    // Validate URL
    let urlObj;
    try {
      urlObj = new URL(url);
      if (!urlObj.protocol.startsWith('http')) {
        throw new Error('Invalid URL protocol. Please use http:// or https://');
      }
    } catch (e) {
      throw new Error('Invalid URL format. Please provide a valid URL.');
    }

    // Fetch page content with timeout and proper error handling
    const response = await axios.get(url, {
      timeout: 10000,
      maxRedirects: 5,
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
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

    // Send to OpenAI for analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a landing page analysis expert. Analyze the given landing page content against the provided guidelines and provide specific, actionable feedback."
        },
        {
          role: "user",
          content: `
Landing page content:
${JSON.stringify(pageContent, null, 2)}

Guidelines:
${guidelines}

Please analyze this landing page against the guidelines and provide:
1. A score out of 10
2. Key strengths
3. Areas for improvement
4. Specific recommendations
`
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error('Error analyzing landing page:', error);
    throw error;
  }
}

module.exports = { analyzeLandingPage };
