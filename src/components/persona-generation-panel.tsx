'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Search } from 'lucide-react';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import type { GeneratePersonaInput } from '@/ai/flows/generate-persona';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.string().regex(/^\d+$/, { message: 'Age must be a number.' }),
  prompt: z.string().min(10, {
    message: 'Description must be at least 10 characters long.',
  }),
});

interface PersonaGenerationPanelProps {
  onGenerate: (input: GeneratePersonaInput) => void;
  isLoading: boolean;
  filters: { searchTerm: string; ageRange: number[] };
  onFiltersChange: (filters: { searchTerm: string; ageRange: number[] }) => void;
}

export default function PersonaGenerationPanel({
  onGenerate,
  isLoading,
  filters,
  onFiltersChange,
}: PersonaGenerationPanelProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
      prompt: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onGenerate(values);
    form.reset();
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, searchTerm: e.target.value });
  };
  
  const handleSliderChange = (value: number[]) => {
    onFiltersChange({ ...filters, ageRange: value });
  };


  return (
    <div className="space-y-6 p-2">
      <div>
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><Wand2 className="h-5 w-5"/> Generate Persona</h3>
        <p className="text-sm text-muted-foreground mt-1">Describe the kind of persona you want to create.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 34" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., A busy marketing manager who loves yoga..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Forging...' : 'Forge Persona'}
          </Button>
        </form>
      </Form>
      <Separator />
       <div>
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><Search className="h-5 w-5"/> Filter Personas</h3>
        <p className="text-sm text-muted-foreground mt-1">Find specific personas in your collection.</p>
      </div>
       <div className="space-y-4">
         <div className="space-y-2">
           <Label htmlFor="search">Search</Label>
           <Input 
             id="search"
             placeholder="Search by name, profession..."
             value={filters.searchTerm}
             onChange={handleSearchChange}
           />
         </div>
         <div className="space-y-2">
           <Label htmlFor="age-range">Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}</Label>
           <Slider
             id="age-range"
             min={0}
             max={100}
             step={1}
             value={filters.ageRange}
             onValueChange={handleSliderChange}
           />
         </div>
       </div>
    </div>
  );
}
