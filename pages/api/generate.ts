import cohere from 'cohere-ai'
import type { NextApiRequest, NextApiResponse } from 'next'

const COHERE_API_KEY: string = process.env.COHERE_API_KEY || ''

cohere.init(COHERE_API_KEY)

export default async function generate (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',
      prompt: `Generate a great product description for the following input: ${req.body.prompt}`,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    })
    res.status(200).json({ text: response.body.generations[0].text })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
};
