import React, { useState } from 'react';
import { Download, ExternalLink, Maximize2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';

interface PDFPreviewProps {
  fileUrl: string;
  fileName: string;
  fileType?: string;
  previewUrl?: string;
}

export function PDFPreview({ fileUrl, fileName, fileType = 'pdf', previewUrl }: PDFPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    // In production, this would trigger actual download
    window.open(fileUrl, '_blank');
  };

  const handleOpenNew = () => {
    window.open(fileUrl, '_blank');
  };

  return (
    <>
      <Card className="overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b bg-muted/20">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm truncate">{fileName}</span>
            <span className="text-xs text-muted-foreground uppercase">{fileType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-8 w-8 p-0"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenNew}
              className="h-8 w-8 p-0"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(true)}
              className="h-8 w-8 p-0"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="relative bg-muted/10">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt={fileName}
              className="w-full h-auto max-h-[600px] object-contain"
            />
          ) : (
            <div className="aspect-[4/3] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-sm">Preview not available</p>
                <p className="text-xs mt-1">Click download to view file</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] h-[95vh] p-0" aria-describedby="pdf-preview-description">
          <DialogDescription id="pdf-preview-description" className="sr-only">
            Fullscreen preview of {fileName}
          </DialogDescription>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-3 border-b shrink-0">
              <span className="text-sm truncate">{fileName}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto bg-muted/10">
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt={fileName}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <div className="text-8xl mb-4">📄</div>
                    <p>Preview not available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
