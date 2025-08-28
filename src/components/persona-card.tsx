'use client';

import { useState } from 'react';
import { Persona } from '@/lib/types';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Download, MoreVertical } from 'lucide-react';
import { PersonaCardContent } from './persona-card-content';
import { exportAsJson, exportAsMarkdown } from '@/lib/utils';

interface PersonaCardProps {
  persona: Persona;
  onUpdate: (id: string, updatedData: Partial<Persona>, changeDescription: string) => void;
  onDelete: (id: string) => void;
}

const personaToMarkdown = (persona: Persona): string => {
  let md = `# ${persona.name}\n\n`;
  md += `**Age:** ${persona.age}\n`;
  md += `**Profession:** ${persona.profession}\n\n`;
  md += `## Bio\n${persona.bio}\n\n`;

  const createSection = (title: string, items: string[]) => {
    if (items.length === 0) return '';
    let section = `## ${title}\n`;
    items.forEach(item => section += `- ${item}\n`);
    return section + '\n';
  };

  md += createSection('Personality Traits', persona.personalityTraits);
  md += createSection('Goals', persona.goals);
  md += createSection('Motivations', persona.motivations);
  md += createSection('Pain Points', persona.painPoints);
  md += createSection('Emotions', persona.emotions);
  md += createSection('Demographics', persona.demographics);

  return md;
};

export function PersonaCard({ persona, onUpdate, onDelete }: PersonaCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  // NOTE: Full editing UI is deferred for brevity but can be built here.
  // For now, the edit button is present but doesn't activate a form.
  
  const handleExport = (format: 'json' | 'md' | 'pdf') => {
    const filename = persona.name.toLowerCase().replace(/\s+/g, '-');
    if (format === 'json') {
      exportAsJson(persona, filename);
    }
    if (format === 'md') {
      exportAsMarkdown(personaToMarkdown(persona), filename);
    }
    if (format === 'pdf') {
      // PDF export would require a library like jspdf, deferred.
      alert('PDF export is not yet available.');
    }
  };


  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300 bg-card">
      <div className="flex-grow">
          <PersonaCardContent persona={persona} />
      </div>
      <CardFooter className="flex justify-end gap-2 bg-muted/50 p-3">
        <Button variant="ghost" size="sm" onClick={() => alert('Editing UI not implemented yet.')}>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport('json')}>JSON</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('md')}>Markdown</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')} disabled>PDF</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the persona for {persona.name}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(persona.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
