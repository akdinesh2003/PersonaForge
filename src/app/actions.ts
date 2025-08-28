'use server';

import { generatePersona } from '@/ai/flows/generate-persona';
import { enrichPersona } from '@/ai/flows/enrich-persona';
import type { Persona } from '@/lib/types';
import type { GeneratePersonaInput } from '@/ai/flows/generate-persona';

const parseList = (text: string, header: string): string[] => {
  const regex = new RegExp(`(?:\\*\\*${header}\\*\\*|${header}:)([\\s\\S]*?)(?:\\n\\*\\*|\\n\\n|$)`, 'i');
  const match = text.match(regex);
  if (match && match[1]) {
    return match[1]
      .trim()
      .split('\n')
      .map((item) => item.trim().replace(/^[-*]\s*/, ''))
      .filter(Boolean);
  }
  return [];
};

const parseValue = (text: string, field: string): string => {
  const regex = new RegExp(`(?:\\*\\*${field}\\*\\*|${field}):\\s*(.+)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
};

const parseBio = (text: string): string => {
    const bioHeaders = ['Bio', 'Background', 'Summary'];
    for (const header of bioHeaders) {
        const bio = parseValue(text, header);
        if (bio) return bio;
    }

    // Fallback if no specific bio section is found
    const firstSectionMatch = text.match(/^(.*?)(?:\n\*\*|\n\n)/);
    if (firstSectionMatch) {
        const potentialBio = firstSectionMatch[1].trim();
        // Avoid using sections that are just key-value pairs
        if (!/:\s/.test(potentialBio)) {
            return potentialBio;
        }
    }
    
    // Final fallback to the first significant paragraph if any
    const paragraphs = text.split('\n\n');
    return paragraphs[0] || '';
}

const parsePersonaText = (text: string): Omit<Persona, 'id' | 'avatarUrl' | 'name' | 'age'> => {
  const profession = parseValue(text, 'Profession');
  const bio = parseBio(text);

  return {
    profession: profession || 'Unspecified',
    bio: bio,
    demographics: parseList(text, 'Demographics'),
    personalityTraits: parseList(text, 'Personality Traits'),
    motivations: parseList(text, 'Motivations'),
    painPoints: parseList(text, 'Pain Points'),
    goals: parseList(text, 'Goals'),
    emotions: parseList(text, 'Emotions'),
    rawText: text,
  };
};

export async function generatePersonaAction(input: GeneratePersonaInput): Promise<Persona> {
  const { personaDetails } = await generatePersona(input);
  if (!personaDetails) {
    throw new Error('AI failed to generate persona details.');
  }
  const parsedData = parsePersonaText(personaDetails);
  
  return {
    id: crypto.randomUUID(),
    name: input.name,
    age: parseInt(input.age, 10),
    ...parsedData,
    avatarUrl: `https://picsum.photos/seed/${crypto.randomUUID()}/400`,
  };
}

export async function updatePersonaAction(
  existingPersona: Persona,
  changeDescription: string
): Promise<Persona> {
  const enrichedText = await enrichPersona({
    existingPersona: existingPersona.rawText,
    additionalDetails: changeDescription,
  });

  if (!enrichedText) {
    throw new Error('AI failed to enrich persona.');
  }
  
  const parsedData = parsePersonaText(enrichedText);

  return {
    ...existingPersona,
    ...parsedData,
    rawText: enrichedText,
  };
}
