/* --------------------------------------------- */
// Define the component options here
/* --------------------------------------------- */
const codeWordOptions = {
  specSrc: "https://spec.speakeasy.com/dub/dub/dub-with-code-samples",
  toggleShortcut: "$mod+s",
  suggestions: [
    'Find me my top 5 visted links'
  ]
  // Note: codeLang is sniffed from the URL
}
/* --------------------------------------------- */

/* Bootstrapping code */
/* --------------------------------------------- */
const injectCodeWords = (options) => {
  // Figure out which language we're viewing
  const { pathname } = document.location
  let codeLang = null;
  let previousComponent = null;
  if (pathname.startsWith('/sdks/typescript')) {
    // TypeScript is different than the others
    codeLang = 'typescript'
    previousComponent = document.getElementById('install')
  } else if (pathname.startsWith('/sdks/quickstart/go')) {
    codeLang = 'go'
    previousComponent = document.getElementById('1-prerequisites')
  } else if (pathname.startsWith('/sdks/quickstart/python')) {
    codeLang = 'python'
    previousComponent = document.getElementById('1-prerequisites')
  } else if (pathname.startsWith('/sdks/quickstart/php')) {
    codeLang = 'php'
    previousComponent = document.getElementById('1-prerequisites')
  }
  // There's also a Ruby SDK, but we don't support that yet in code words

  // Filter out landing pages, unsupported languages, etc.
  if (!codeLang || !previousComponent) {
    return;
  }

  // Create code words widget
  const codeWords = document.createElement("code-words-commandbar")
  Object.entries({ ...options, codeLang }).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value = JSON.stringify(value)
    }
    codeWords.setAttribute(key, value)
  })

  // Create the trigger button
  const triggerButton = document.createElement('button')
  triggerButton.innerText = 'Generate Example Code'
  triggerButton.className = 'pointer-events-auto rounded-xl py-1.5 pl-3.5 pr-3 text-gray-400 dark:text-white/50 bg-background-light dark:bg-background-dark dark:brightness-[1.1] dark:ring-1 dark:hover:brightness-[1.25] ring-1 ring-gray-400/20 hover:ring-gray-600/25 dark:ring-gray-600/30 dark:hover:ring-gray-500/30 focus:outline-primary'
  codeWords.appendChild(triggerButton)

  // Attach to the dom just after the usage header
  previousComponent.insertAdjacentElement('beforebegin', codeWords)
}

const installWebComponent = async (options) => {
  const script = document.createElement('script')
  script.type = 'module'
  script.src = "https://code-words-ui.vercel.app/index.es.js"
  document.head.appendChild(script)
  script.addEventListener('load', async () => {
    // Initial load
    injectCodeWords(options)

    // Listen for changes to href, and reload as needed
    let oldHref = document.location.href
    const body = document.querySelector('body');
    const observer = new MutationObserver(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href
        injectCodeWords(options)
      }
    });
    observer.observe(body, { childList: true, subtree: true });
  })
}

installWebComponent(codeWordOptions)
