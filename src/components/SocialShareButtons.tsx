'use client';

import { Link as LinkIcon, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { trackEvent } from '@/utils/tracking';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  showLabels?: boolean;
  className?: string;
}

const SocialShareButtons = ({
  url = process.env.NEXT_PUBLIC_URL || '',
  title = 'Holiday Optimizer - Maximize Your Time Off',
  description = 'Plan your PTO days strategically to get the most out of your holidays.',
  showLabels = false,
  className = '',
}: SocialShareButtonsProps) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const message = `Check this out: ${url}%0A%0A${title}%0A${description}`;

  const trackShare = (platform: string) => {
    trackEvent('Content shared', { platform });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success('URL copied to clipboard');
        trackShare('clipboard');
      },
      () => {
        toast.error('Failed to copy URL');
      }
    );
  };

  const getEmailShareUrl = () => {
    return `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${url}`;
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        onClick={() => trackShare('twitter')}
        className={`inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground ${showLabels ? 'px-3 h-9' : 'h-9 w-9'}`}
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <title>X</title>
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
        {showLabels && <span className="ml-2 text-sm">Twitter/X</span>}
      </a>

      <a
        href={`whatsapp://send?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        onClick={() => trackShare('WhatsApp')}
        className={`inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground ${showLabels ? 'px-3 h-9' : 'h-9 w-9'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
        {showLabels && <span className="ml-2 text-sm">WhatsApp</span>}
      </a>

      <a
        href={`https://www.linkedin.com/feed/?shareActive=true&text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        onClick={() => trackShare('linkedin')}
        className={`inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground ${showLabels ? 'px-3 h-9' : 'h-9 w-9'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="h-4 w-4"
        >
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
        </svg>
        {showLabels && <span className="ml-2 text-sm">LinkedIn</span>}
      </a>

      <a
        href={getEmailShareUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share via Email"
        onClick={() => trackShare('email')}
        className={`inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground ${showLabels ? 'px-3 h-9' : 'h-9 w-9'}`}
      >
        <Mail className="h-4 w-4" />
        {showLabels && <span className="ml-2 text-sm">Email</span>}
      </a>

      <Button
        variant="outline"
        size={showLabels ? 'default' : 'icon'}
        onClick={copyToClipboard}
        aria-label="Copy link to clipboard"
        className={showLabels ? 'h-9 px-3' : ''}
      >
        <LinkIcon className="h-4 w-4" />
        {showLabels && <span className="ml-2 text-sm">Copy Link</span>}
      </Button>
    </div>
  );
};

export default SocialShareButtons;
