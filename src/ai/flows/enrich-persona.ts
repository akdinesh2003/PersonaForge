'use server';

/**
 * @fileOverview This file contains the Genkit flow for enriching an existing persona with more details.
 *
 * - enrichPersona - A function that enriches an existing persona with additional details based on prompts or keywords.
 * - EnrichPersonaInput - The input type for the enrichPersona function.
 * - EnrichPersonaOutput - The return type for the enrichPersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnrichPersonaInputSchema = z.object({
  existingPersona: z.string().describe('The existing persona in string format.'),
  additionalDetails: z.string().describe('Prompts or keywords to enrich the persona.'),
});

export type EnrichPersonaInput = z.infer<typeof EnrichPersonaInputSchema>;

const EnrichPersonaOutputSchema = z.string().describe('The enriched persona with added details.');

export type EnrichPersonaOutput = z.infer<typeof EnrichPersonaOutputSchema>;

export async function enrichPersona(input: EnrichPersonaInput): Promise<EnrichPersonaOutput> {
  return enrichPersonaFlow(input);
}

const enrichPersonaPrompt = ai.definePrompt({
  name: 'enrichPersonaPrompt',
  input: {
    schema: EnrichPersonaInputSchema,
  },
  output: {
    schema: EnrichPersonaOutputSchema,
  },
  prompt: `You are an AI persona enrichment expert. Given an existing persona and additional details, your job is to enrich the persona with the provided details.  Make sure to include all existing details about the persona.  The persona should be written as a block of text.

Existing Persona:
{{{existingPersona}}}

Additional Details:
{{{additionalDetails}}}`, 
});

const enrichPersonaFlow = ai.defineFlow(
  {
    name: 'enrichPersonaFlow',
    inputSchema: EnrichPersonaInputSchema,
    outputSchema: EnrichPersonaOutputSchema,
  },
  async input => {
    const {output} = await enrichPersonaPrompt(input);
    return output!;
  }
);
