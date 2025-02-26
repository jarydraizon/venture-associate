
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
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process'
    ]
  });
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.evaluate(() => document.body.innerText);
  await browser.close();
  return content;
}

router.post('/analyzeLandingPage', async (req, res) => {
  try {
    const { url } = req.body;

    // Crawl the landing page
    const pageContent = await crawlPage(url);

    // Analyze with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a landing page analysis expert. Analyze the provided landing page content and provide insights on its effectiveness, strengths, and areas for improvement."
        },
        {
          role: "user",
          content: `Please analyze this landing page content:\n\n${pageContent}`
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
