import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      theme="light"
      richColors={false}
      closeButton={false}
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            'group bg-card text-card-foreground border border-border rounded-sm font-sans shadow-none',
          title: 'text-sm font-medium tracking-tight',
          description: 'text-xs text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground rounded-sm',
          cancelButton: 'bg-muted text-muted-foreground rounded-sm',
        },
      }}
    />
  );
}
