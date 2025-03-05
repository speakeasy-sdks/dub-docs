
/* --------------------------------------------- */
// Define the component options here
/* --------------------------------------------- */
const codeWordOptions = {
  specSrc: "https://spec.speakeasy.com/dub/dub/dub-with-code-samples",
  codeLang: "typescript",
  toggleShortcut: "$mod+s",
  suggestions: [
    'Find me my top 5 visted links'
  ]
}
/* --------------------------------------------- */






/* Bootstrapping code */
/* --------------------------------------------- */
const installWebComponent = async (options) => {
  const script = document.createElement('script')
  script.type = 'module'
  script.src = "https://code-words-ui.vercel.app/index.es.js"
  document.head.appendChild(script)
  script.addEventListener('load', async () => {
    const codeWords = document.createElement("code-words-commandbar")

    Object.entries(options).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value = JSON.stringify(value)
      }
      codeWords.setAttribute(key, value)
    })

    document.body.appendChild(codeWords)
  })
}

installWebComponent(codeWordOptions)
