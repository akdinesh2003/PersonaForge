'use client';

import { useState, useEffect, useMemo } from 'react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import Header from '@/components/header';
import PersonaGenerationPanel from '@/components/persona-generation-panel';
import { PersonaCard } from '@/components/persona-card';
import { PersonaCardSkeleton } from '@/components/persona-card-skeleton';
import EmptyState from '@/components/empty-state';
import type { Persona } from '@/lib/types';
import { generatePersonaAction, updatePersonaAction } from './actions';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ searchTerm: '', ageRange: [0, 100] });
  const { toast } = useToast();

  const handleGeneratePersona = async (prompt: string) => {
    setIsLoading(true);
    try {
      const newPersona = await generatePersonaAction(prompt);
      setPersonas((prev) => [newPersona, ...prev]);
      toast({
        title: 'Persona Generated!',
        description: `Meet ${newPersona.name}.`,
      });
    } catch (error) {
      console.error('Failed to generate persona:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate a new persona. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePersona = async (id: string, updatedData: Partial<Persona>, changeDescription: string) => {
    const originalPersona = personas.find(p => p.id === id);
    if (!originalPersona) return;

    try {
      const updatedPersona = await updatePersonaAction(originalPersona, changeDescription);
      setPersonas((prev) => prev.map((p) => (p.id === id ? updatedPersona : p)));
      toast({
        title: 'Persona Updated!',
        description: `${updatedPersona.name}'s profile has been refreshed.`,
      });
    } catch (error) {
      console.error('Failed to update persona:', error);
       toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not update the persona. Please try again.',
      });
    }
  };

  const handleDeletePersona = (id: string) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: 'Persona Deleted',
    });
  };

  const filteredPersonas = useMemo(() => {
    return personas.filter(persona => {
      const searchTermMatch = filters.searchTerm.trim() === '' ||
        persona.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        persona.profession.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        persona.personalityTraits.some(trait => trait.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      const ageMatch = persona.age >= filters.ageRange[0] && persona.age <= filters.ageRange[1];
      
      return searchTermMatch && ageMatch;
    });
  }, [personas, filters]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar
            variant="sidebar"
            collapsible="icon"
            className="hidden border-r bg-card md:flex"
          >
            <SidebarContent>
              <SidebarHeader>
                 <PersonaGenerationPanel
                  onGenerate={handleGeneratePersona}
                  isLoading={isLoading}
                  filters={filters}
                  onFiltersChange={setFilters}
                  key={personas.length} // Force re-render of panel if needed
                />
              </SidebarHeader>
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 overflow-auto p-4 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading && personas.length === 0 && Array.from({ length: 4 }).map((_, i) => <PersonaCardSkeleton key={i} />)}
              
              {filteredPersonas.map((persona) => (
                <PersonaCard 
                  key={persona.id} 
                  persona={persona} 
                  onUpdate={handleUpdatePersona}
                  onDelete={handleDeletePersona}
                />
              ))}

              {!isLoading && filteredPersonas.length === 0 && (
                 <div className="col-span-full">
                  <EmptyState onGenerate={handleGeneratePersona} />
                 </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
