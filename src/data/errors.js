// Wording for every error page. The 404 inside the app (NotFoundView.vue) and the
// standalone pages the web server shows (built by error-pages.js) both read from here.
// `retry` marks problems that may clear on their own, so the page offers "Try again".
export const errors = {
  400: { label: 'Bad request', title: 'That request didn’t make sense.', text: 'Something in the address or the form couldn’t be read. Check the link and try again.' },
  401: { label: 'Sign-in required', title: 'You need to sign in first.', text: 'This page needs a login we don’t recognise. Head back to the home page to keep browsing.' },
  403: { label: 'Access denied', title: 'This page is off limits.', text: 'You don’t have permission to open this page. If you think that’s a mistake, get in touch and we’ll help.' },
  404: { label: 'Page not found', title: 'Let’s get you back on track.', text: 'The page you’re looking for may have moved, or the link may be out of date.' },
  500: { label: 'Something went wrong', title: 'That one’s on us.', text: 'Our site hit a problem loading this page. Please try again in a moment.', retry: true },
  502: { label: 'Bad gateway', title: 'We lost the connection.', text: 'Our server got a bad response while loading this page. Please try again in a moment.', retry: true },
  503: { label: 'Temporarily unavailable', title: 'We’ll be back shortly.', text: 'The site is down for a short while for maintenance. Please check back soon.', retry: true },
  504: { label: 'Timed out', title: 'That took too long.', text: 'The page didn’t load in time. Please try again in a moment.', retry: true },
}
