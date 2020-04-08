export function readCookie(key) {
  const queriesAll = document.cookie.replace(/\s+/g, '').split(';')
  const result = queriesAll.find((cookie) => cookie.startsWith(key + '='))
  return result ? result.split(key + '=')[1] : null
}
export function setUrlWhereArrived() {
  const urlWhereArrived = readCookie('url_adondellega')
  if (urlWhereArrived) return
  const experationDate = new Date()
  experationDate.setHours(experationDate.getHours() + 10 * 365 * 24)
  document.cookie =
    'url_adondellega' +
    '=' +
    window.location.toString().split('?')[0] +
    '; expires=' +
    experationDate.toUTCString() +
    '; path=/' +
    '; samesite=Unset'
  if (document.referrer && document.referrer !== document.location.href) {
    document.cookie =
      'url_dedondeviene' +
      '=' +
      document.referrer +
      '; expires=' +
      experationDate.toUTCString() +
      '; path=/' +
      '; samesite=Unset'
  }
}
export function getAttributions() {
  const whereArrives = readCookie('url_adondellega')
  const whereItComesFrom = readCookie('url_dedondeviene')
  const elementWhereRegisters = readCookie('url_elementoenelqueseregistra')
  const whereRegisters = readCookie('url_dondeseregistra')
  const attributions = readCookie('landing_source')
  const innerAttributions = readCookie('inner_landing')
  const utms = attributions || innerAttributions

  let atrr = {
    utmSource: '',
    utmMedium: 'Directo Website',
    utmCampaign: null,
  }
  if (utms && utms.split) {
    atrr = utms.split('&').reduce((obj, utm) => {
      const [key, value] = utm.split('=')
      obj[key] = value
      return obj
    }, {})
  }
  return {
    utms: atrr,
    whereArrives,
    whereItComesFrom,
    elementWhereRegisters,
    whereRegisters,
  }
}
