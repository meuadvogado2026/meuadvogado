import { toast } from "sonner";

/**
 * Compartilha um link via Web Share API (mobile) ou copia para a área de transferência (desktop).
 */
export const shareOrCopy = async (data: {
  title: string;
  text: string;
  url: string;
}): Promise<void> => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      // Fallback para clipboard se o share falhar
    }
  }

  await navigator.clipboard.writeText(data.url);
  toast.success("Link copiado para a área de transferência!");
};
