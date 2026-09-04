"use client";

import { LEGAL_PAGES, type LegalId } from "@/content/legal";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function LegalSheet({
  page,
  onClose,
}: {
  page: LegalId | null;
  onClose: () => void;
}) {
  const entry = page ? LEGAL_PAGES[page] : null;
  const Body = entry?.Body;

  return (
    <Sheet open={!!page} modal="trap-focus" onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent side="right" className="legal-sheet">
        {entry && Body && (
          <>
            <SheetHeader>
              <SheetTitle>{entry.title}</SheetTitle>
              <SheetDescription>Radio keeps playing while you read.</SheetDescription>
            </SheetHeader>
            <div className="legal-sheet-body">
              <Body />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
