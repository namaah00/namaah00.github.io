import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { MessageSquare } from 'lucide-react';
import { CommentDialog } from './CommentDialog';
import type { TechniqueComment } from '../App';

interface Technique {
  id: string;
  name: string;
  description: string;
  children?: Technique[];
}

interface Tactic {
  id: string;
  name: string;
  techniques: Technique[];
}

export const TACTICS_DATA: Tactic[] = [
  {
    id: 'l1',
    name: 'L1 - Jakość Informacji',
    techniques: [
      { 
        id: '001', 
        name: 'Ocena treści', 
        description: 'PE (Primary Elements)',
        children: [
          { id: '001.1', name: 'Spójność logiczna', description: 'SE (Secondary Elements)' },
          { id: '001.2', name: 'Forma przekazu', description: 'SE (Secondary Elements)' },
          { id: '001.3', name: 'Transparentność', description: 'SE (Secondary Elements)' },
          { id: '001.4', name: 'Rzetelność', description: 'SE (Secondary Elements)' },
          { id: '001.5', name: 'Obiektywność', description: 'SE (Secondary Elements)' },
          { id: '001.6', name: 'Autentyczność cyfrowa', description: 'SE (Secondary Elements)' },
        ]
      },
      { 
        id: '002', 
        name: 'Ocena Źródła', 
        description: 'PE (Primary Elements)',
        children: [
          { id: '002.1', name: 'Autorytet', description: 'SE (Secondary Elements)' },
          { id: '002.2', name: 'Reputacja', description: 'SE (Secondary Elements)' },
          { id: '002.3', name: 'Afiliacja', description: 'SE (Secondary Elements)' },
          { id: '002.4', name: 'Historia Wiarygodności', description: 'SE (Secondary Elements)' },
        ]
      },
    ],
  },
  {
    id: 'l2',
    name: 'L2 - Szersze tło',
    techniques: [
      { 
        id: '003', 
        name: 'Ocena kontekstu', 
        description: 'PE (Primary Elements)',
        children: [
          { id: '003.1', name: 'Aktualność', description: 'SE (Secondary Elements)' },
          { id: '003.2', name: 'Cel przekazu', description: 'SE (Secondary Elements)' },
          { id: '003.3', name: 'Odbiorca', description: 'SE (Secondary Elements)' },
          { id: '003.4', name: 'Sytuacja społeczna', description: 'SE (Secondary Elements)' },
          { id: '003.5', name: 'Interesy', description: 'SE (Secondary Elements)' },
          { id: '003.6', name: 'Okoliczności powstania', description: 'SE (Secondary Elements)' },
          { id: '003.7', name: 'Dynamika', description: 'SE (Secondary Elements)' },
          { id: '003.8', name: 'Kontekst geopolityczny', description: 'SE (Secondary Elements)' },
          { id: '003.9', name: 'Zasięg', description: 'SE (Secondary Elements)' },
          { id: '003.10', name: 'Spójność techniczna przekazu', description: 'SE (Secondary Elements)' },
        ]
      },
    ],
  },
  {
    id: 'l3',
    name: 'L3 - Zestawienie źródeł',
    techniques: [
      { 
        id: '004', 
        name: 'Ocena kontrastu', 
        description: 'PE (Primary Elements)',
        children: [
          { id: '004.1', name: 'Zgodności', description: 'SE (Secondary Elements)' },
          { id: '004.2', name: 'Rozbieżności', description: 'SE (Secondary Elements)' },
          { id: '004.3', name: 'Różnorodność', description: 'SE (Secondary Elements)' },
          { id: '004.4', name: 'Kontekst międzynarodowy', description: 'SE (Secondary Elements)' },
        ]
      },
    ],
  },
];

interface MatrixViewProps {
  searchQuery: string;
  comments: Record<string, TechniqueComment>;
  onSaveComment: (techniqueId: string, title: string, content: string) => void;
  onDeleteComment: (techniqueId: string) => void;
}

export function MatrixView({ 
  searchQuery, 
  comments,
  onSaveComment,
  onDeleteComment 
}: MatrixViewProps) {
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const matchesSearch = (technique: Technique): boolean => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matches = 
      technique.name.toLowerCase().includes(query) ||
      technique.id.toLowerCase().includes(query) ||
      technique.description.toLowerCase().includes(query);
    
    if (matches) return true;
    
    // Check children
    if (technique.children) {
      return technique.children.some(child => matchesSearch(child));
    }
    
    return false;
  };

  const filterTechniques = (techniques: Technique[]) => {
    if (!searchQuery) return techniques;
    return techniques.filter(t => matchesSearch(t));
  };

  const handleOpenComment = (technique: Technique, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTechnique(technique);
    setCommentDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full">
          {TACTICS_DATA.map((tactic) => {
            const filteredTechniques = filterTechniques(tactic.techniques);
            if (searchQuery && filteredTechniques.length === 0) return null;

            return (
              <div key={tactic.id} className="flex-1 min-w-[280px] border-r border-slate-200 last:border-r-0">
                {/* Tactic Header */}
                <div className="bg-slate-800 text-white p-4 text-center">
                  <h3>{tactic.name}</h3>
                </div>

                {/* Techniques */}
                <div className="p-2 space-y-3">
                  {filteredTechniques.map((technique) => {
                    const hasComment = !!comments[technique.id];
                    return (
                      <div key={technique.id} className="space-y-2">
                        {/* Primary Element (PE) */}
                        <Card className="p-3 bg-blue-50 border-blue-200">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Badge variant="outline" className="shrink-0 bg-blue-600 text-white border-blue-700">
                              {technique.id}
                            </Badge>
                          </div>
                          <p className="text-slate-900 mb-1">{technique.name}</p>
                          <p className="text-slate-600 text-sm">{technique.description}</p>
                        </Card>

                        {/* Secondary Elements (SE) */}
                        {technique.children && technique.children.length > 0 && (
                          <div className="pl-4 space-y-2 border-l-2 border-blue-300">
                            {technique.children.map((child) => {
                              const hasChildComment = !!comments[child.id];
                              return (
                                <Card
                                  key={child.id}
                                  className="p-3 transition-all hover:shadow-md bg-white hover:bg-slate-50"
                                >
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <Badge variant="outline" className="shrink-0 text-slate-700">
                                      {child.id}
                                    </Badge>
                                    {hasChildComment && (
                                      <div className="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-1" />
                                    )}
                                  </div>
                                  <p className="text-slate-900 mb-1">{child.name}</p>
                                  <p className="text-slate-600 text-sm mb-3">{child.description}</p>
                                  
                                  {hasChildComment && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2 space-y-1">
                                      <p className="text-green-900">
                                        {comments[child.id].title}
                                      </p>
                                      <p className="text-green-800 text-sm">
                                        {comments[child.id].content}
                                      </p>
                                    </div>
                                  )}
                                  
                                  <Button
                                    variant={hasChildComment ? "default" : "outline"}
                                    size="sm"
                                    className="w-full gap-2"
                                    onClick={(e) => handleOpenComment(child, e)}
                                  >
                                    <MessageSquare className="w-3 h-3" />
                                    {hasChildComment ? 'View Comment' : 'Add Comment'}
                                  </Button>
                                </Card>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {searchQuery && TACTICS_DATA.every((t) => filterTechniques(t.techniques).length === 0) && (
        <div className="p-12 text-center text-slate-500">
          <p>No techniques found matching "{searchQuery}"</p>
        </div>
      )}

      {selectedTechnique && (
        <CommentDialog
          open={commentDialogOpen}
          onOpenChange={setCommentDialogOpen}
          techniqueId={selectedTechnique.id}
          techniqueName={selectedTechnique.name}
          comment={comments[selectedTechnique.id] || null}
          onSave={onSaveComment}
          onDelete={onDeleteComment}
        />
      )}
    </div>
  );
}
