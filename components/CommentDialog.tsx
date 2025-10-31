import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { MessageSquare, Trash2 } from 'lucide-react';
import type { TechniqueComment } from '../App';

interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  techniqueId: string;
  techniqueName: string;
  comment: TechniqueComment | null;
  onSave: (techniqueId: string, title: string, content: string) => void;
  onDelete: (techniqueId: string) => void;
}

export function CommentDialog({
  open,
  onOpenChange,
  techniqueId,
  techniqueName,
  comment,
  onSave,
  onDelete,
}: CommentDialogProps) {
  const [localTitle, setLocalTitle] = useState('');
  const [localContent, setLocalContent] = useState('');

  useEffect(() => {
    if (open) {
      setLocalTitle(comment?.title || '');
      setLocalContent(comment?.content || '');
    }
  }, [comment, open]);

  const handleSave = () => {
    if (!localTitle.trim()) {
      return; // Require title
    }
    onSave(techniqueId, localTitle, localContent);
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete(techniqueId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <DialogTitle>Add Comment</DialogTitle>
          </div>
          <DialogDescription>
            Add notes or observations for technique{' '}
            <Badge variant="secondary" className="ml-1">
              {techniqueId}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="text-slate-700 mb-2 block">Technique</Label>
            <p className="text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-200">
              {techniqueName}
            </p>
          </div>

          <div>
            <Label htmlFor="title" className="text-slate-700 mb-2 block">
              Comment Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              placeholder="Enter a title for this comment..."
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-slate-700 mb-2 block">
              Comment Content
            </Label>
            <Textarea
              id="content"
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              placeholder="Enter your comment here..."
              className="min-h-[200px] resize-none"
            />
            <p className="text-slate-500 text-sm mt-2">
              {localContent.length} characters
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div>
            {comment && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Comment
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!localTitle.trim()}>
              Save Comment
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
