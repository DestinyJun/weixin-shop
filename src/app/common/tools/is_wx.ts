export function is_wx(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/MicroMessenger/i);
}
