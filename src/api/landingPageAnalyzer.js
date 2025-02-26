
const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function crawlPage(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/nix/store/x205pbkd5xh5g4iv0g58xjla55has3cx-chromium-108.0.5359.94/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-software-rasterizer'
    ]
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  const content = await page.evaluate(() => document.body.innerText);
  await browser.close();
  return content;
}

router.post('/analyzeLandingPage', async (req, res) => {
  try {
    const { userMessage } = req.body;
  
  // Extract URL from user message
  const urlMatch = userMessage.match(/(https?:\/\/[^\s]+)/);
  if (!urlMatch) {
    return res.status(400).json({ error: 'No valid URL found in message' });
  }
  const url = urlMatch[0];

  try {
    // Crawl the landing page
    const pageContent = await crawlPage(url);

    // Analyze with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a landing page analysis expert. Your task is to analyze a landing page. Focus on effectiveness, strengths, and areas for improvement."
        },
        {
          role: "user",
          content: `Analyze this landing page content and provide specific recommendations:\n\n${pageContent}`
        }
      ],
      temperature: 0.7,
    });

    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    console.error('Landing page analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze landing page' });
  }
});

module.exports = router;
