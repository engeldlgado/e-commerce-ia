import cohere from 'cohere-ai'

cohere.init(process.env.COHERE_API_KEY)

export default async function generate (req, res) {
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
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};
