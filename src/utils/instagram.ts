export function openInstagramProfile(username: string, event?: Pick<MouseEvent, 'preventDefault'> | null) {
  try { event?.preventDefault?.(); } catch {}
  const profile = username.replace(/^@/, '');
  const webUrl = `https://www.instagram.com/${profile}/`;
  const universalUrl = `https://instagram.com/_u/${profile}/`;
  const appSchemeUrl = `instagram://user?username=${profile}`;

  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

  const openWeb = () => {
    try { window.open(webUrl, '_blank', 'noopener,noreferrer'); } catch {}
  };

  // Fallback timer to universal link / web
  const timer = setTimeout(() => {
    try {
      // universal link opens app if possible (mainly iOS), else web
      window.location.href = universalUrl;
    } catch {
      openWeb();
    }
  }, 900);

  try {
    if (isAndroid) {
      // Android intent opens app if installed
      window.location.href = `intent://instagram.com/_u/${profile}/#Intent;package=com.instagram.android;scheme=https;end`;
    } else {
      // iOS scheme
      window.location.href = appSchemeUrl;
    }
  } catch {
    openWeb();
  } finally {
    setTimeout(() => clearTimeout(timer), 2000);
  }
}

export function getInstagramUniversalLink(username: string): string {
  const profile = username.replace(/^@/, '');
  return `https://instagram.com/_u/${profile}/`;
}

export default openInstagramProfile;


