import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { MessageSquare } from 'lucide-react';
import { CommentDialog } from './CommentDialog';
import type { TechniqueComment } from '../App';

interface Technique {
  id: string;
  name: string;
  description: string;
  tactic: string;
}

const ALL_TECHNIQUES: Technique[] = [
  { id: 'T0001', name: '5Ds (Dismiss, Distort, Distract, Dismay, Divide)', description: 'Coordinate strategic approach using the 5Ds framework', tactic: 'Plan Strategy' },
  { id: 'T0002', name: 'Facilitate State Propaganda', description: 'Support and amplify state messaging campaigns', tactic: 'Plan Strategy' },
  { id: 'T0003', name: 'Leverage Existing Narratives', description: 'Use pre-existing stories and beliefs', tactic: 'Plan Strategy' },
  { id: 'T0004', name: 'Develop People as Assets', description: 'Recruit and develop human assets for operations', tactic: 'Plan Strategy' },
  { id: 'T0005', name: 'Develop Owned Media Assets', description: 'Create and maintain controlled media properties', tactic: 'Prepare' },
  { id: 'T0006', name: 'Develop Network', description: 'Build distribution network for content', tactic: 'Prepare' },
  { id: 'T0007', name: 'Create Inauthentic Social Media Pages', description: 'Establish fake accounts and personas', tactic: 'Prepare' },
  { id: 'T0008', name: 'Develop Content', description: 'Create messaging content for campaigns', tactic: 'Prepare' },
  { id: 'T0009', name: 'Create Fake News', description: 'Generate false or misleading information', tactic: 'Execute' },
  { id: 'T0010', name: 'Cultivate Ignorance', description: 'Promote confusion and uncertainty', tactic: 'Execute' },
  { id: 'T0011', name: 'Compromise Legitimate Accounts', description: 'Hack or take over real accounts', tactic: 'Execute' },
  { id: 'T0012', name: 'Use Bots', description: 'Deploy automated accounts for amplification', tactic: 'Execute' },
  { id: 'T0013', name: 'Measure Effectiveness', description: 'Track campaign metrics and KPIs', tactic: 'Assess' },
  { id: 'T0014', name: 'Conduct Web Analytics', description: 'Analyze web traffic and engagement', tactic: 'Assess' },
  { id: 'T0015', name: 'Assess Sentiment', description: 'Monitor public opinion and reactions', tactic: 'Assess' },
  { id: 'T0016', name: 'Identify Trends', description: 'Track emerging patterns in discourse', tactic: 'Assess' },
];

interface TechniquesListProps {
  searchQuery: string;
  selectedTechniques: Set<string>;
  onTechniqueToggle: (techniqueId: string) => void;
  comments: Record<string, TechniqueComment>;
  onSaveComment: (techniqueId: string, title: string, content: string) => void;
  onDeleteComment: (techniqueId: string) => void;
}

export function TechniquesList({ 
  searchQuery, 
  selectedTechniques, 
  onTechniqueToggle,
  comments,
  onSaveComment,
  onDeleteComment 
}: TechniquesListProps) {
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const filteredTechniques = ALL_TECHNIQUES.filter(
    (t) =>
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tactic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenComment = (technique: Technique, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTechnique(technique);
    setCommentDialogOpen(true);
  };

  return (
    <div className="space-y-3">
      <Card className="p-4 bg-slate-50">
        <div className="flex items-center justify-between">
          <p className="text-slate-700">
            Showing <span className="text-slate-900">{filteredTechniques.length}</span> techniques
          </p>
          {selectedTechniques.size > 0 && (
            <p className="text-blue-600">
              {selectedTechniques.size} selected
            </p>
          )}
        </div>
      </Card>

      {filteredTechniques.map((technique) => {
        const isSelected = selectedTechniques.has(technique.id);
        const hasComment = !!comments[technique.id];
        return (
          <Card
            key={technique.id}
            className="p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => onTechniqueToggle(technique.id)}
          >
            <div className="flex items-start gap-4">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onTechniqueToggle(technique.id)}
                className="mt-1"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary" className="text-slate-700">
                    {technique.id}
                  </Badge>
                  <Badge variant="outline" className="text-slate-600">
                    {technique.tactic}
                  </Badge>
                  {hasComment && (
                    <Badge variant="default" className="bg-green-600 gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Comment
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-slate-900 mb-2">{technique.name}</h3>
                <p className="text-slate-600 mb-3">{technique.description}</p>
                
                {hasComment && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <p className="text-green-900 mb-1">{comments[technique.id].title}</p>
                    {comments[technique.id].content && (
                      <p className="text-green-800 text-sm line-clamp-2">
                        {comments[technique.id].content}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Button
                variant={hasComment ? "default" : "outline"}
                size="sm"
                className="gap-2 shrink-0"
                onClick={(e) => handleOpenComment(technique, e)}
              >
                <MessageSquare className="w-4 h-4" />
                {hasComment ? 'Edit' : 'Add'}
              </Button>
            </div>
          </Card>
        );
      })}

      {filteredTechniques.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-slate-500">No techniques found matching your search.</p>
        </Card>
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
