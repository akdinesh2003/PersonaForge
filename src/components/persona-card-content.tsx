import { Persona } from '@/lib/types';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface PersonaCardContentProps {
  persona: Persona;
}

const DetailSection = ({ title, items }: { title: string; items: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <AccordionItem value={title.toLowerCase()}>
      <AccordionTrigger className="text-base font-medium">{title}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {item}
            </Badge>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};


export function PersonaCardContent({ persona }: PersonaCardContentProps) {
  return (
    <>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-sm">
          <AvatarImage src={persona.avatarUrl} alt={persona.name} data-ai-hint="portrait person" />
          <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 pt-2">
          <CardTitle className="text-2xl font-bold">{persona.name}</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {persona.age} years old, {persona.profession}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground/80 mb-4 break-words">{persona.bio}</p>

        <Accordion type="multiple" className="w-full">
            <DetailSection title="Personality" items={persona.personalityTraits} />
            <DetailSection title="Goals" items={persona.goals} />
            <DetailSection title="Motivations" items={persona.motivations} />
            <DetailSection title="Pain Points" items={persona.painPoints} />
            <DetailSection title="Emotions" items={persona.emotions} />
            <DetailSection title="Demographics" items={persona.demographics} />
        </Accordion>
      </CardContent>
    </>
  );
}
