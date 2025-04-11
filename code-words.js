/* --------------------------------------------- */
// Define the component options here
/* --------------------------------------------- */
const codeWordOptions = {
  specSrc: 'https://spec.speakeasy.com/dub/dub/dub-with-code-samples',
  toggleShortcut: '$mod+s',
  suggestions: [
    'How do I create a new link?',
    'Create a function to get my top 5 visited links',
  ],
  publishingToken: 'super-secret-token'
  // Note: codeLang is sniffed from the URL
}

const triggerButtonStyle = 'mx-auto max-w-fit border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-500 shadow-sm rounded-lg'

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
  const codeWords = document.createElement('snippet-ai')
  Object.entries({ ...options, codeLang }).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value = JSON.stringify(value)
    }
    codeWords.setAttribute(key, value)
  })

  // Create the trigger button
  if (document.getElementById('snippet-ai-trigger')) {
    return
  }

  const triggerButton = document.createElement('button')
  triggerButton.innerText = 'Generate Example Code'
  triggerButton.id = 'snippet-ai-trigger'
  triggerButton.className = triggerButtonStyle
  codeWords.appendChild(triggerButton)

  // Attach to the dom just after the usage header
  previousComponent.insertAdjacentElement('beforebegin', codeWords)
}

const installWebComponent = async (options) => {
  const script = document.createElement('script')
  script.type = 'module'
  script.src = 'https://snippet-ai.speakeasy-cloud.com/assets/index.es.js'
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
