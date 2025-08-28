'use server';

/**
 * @fileOverview Generates a user persona based on a prompt.
 *
 * - generatePersona - A function that generates a persona.
 * - GeneratePersonaInput - The input type for the generatePersona function.
 * - GeneratePersonaOutput - The return type for the generatePersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonaInputSchema = z.object({
  name: z.string().describe('The name of the persona.'),
  age: z.string().describe('The age of the persona.'),
  prompt: z.string().describe('A prompt describing the desired persona.'),
});
export type GeneratePersonaInput = z.infer<typeof GeneratePersonaInputSchema>;

const GeneratePersonaOutputSchema = z.object({
  personaDetails: z.string().describe('The generated persona details.'),
});
export type GeneratePersonaOutput = z.infer<typeof GeneratePersonaOutputSchema>;

export async function generatePersona(input: GeneratePersonaInput): Promise<GeneratePersonaOutput> {
  return generatePersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonaPrompt',
  input: {schema: GeneratePersonaInputSchema},
  output: {schema: GeneratePersonaOutputSchema},
  prompt: `You are a persona generation expert. Please generate a detailed user persona based on the following information.

Name: {{{name}}}
Age: {{{age}}}
Description: {{{prompt}}}

Include details such as a bio, demographics, motivations, pain points, and goals. Ensure you use the provided Name and Age in your response.`,
});

const generatePersonaFlow = ai.defineFlow(
  {
    name: 'generatePersonaFlow',
    inputSchema: GeneratePersonaInputSchema,
    outputSchema: GeneratePersonaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
