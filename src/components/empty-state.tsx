'use client';

import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

interface EmptyStateProps {
  onGenerate: (prompt: string) => void;
}

const examplePrompts = [
  "A tech-savvy university student in London",
  "A retired librarian who loves gardening",
  "A busy single parent juggling work and family",
  "An aspiring musician living in Nashville",
]

export default function EmptyState({ onGenerate }: EmptyStateProps) {
    const handleGenerateClick = () => {
        const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
        onGenerate(randomPrompt);
    }
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center shadow-sm h-full">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
        <PenSquare className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight">No Personas Yet</h3>
      <p className="mt-2 text-muted-foreground">
        Ready to bring your users to life? Generate your first persona.
      </p>
      <div className="mt-6">
        <Button onClick={handleGenerateClick}>
          Create a Persona
        </Button>
      </div>
       <p className="mt-4 text-sm text-muted-foreground">
        or try an example like "{examplePrompts[0]}"
      </p>
    </div>
  );
}
