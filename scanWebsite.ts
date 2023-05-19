const jsdom = require('jsdom')
const tabletojson = require('tabletojson').Tabletojson

fetch('http://www.pjbc.gob.mx/boletinj/2023/my_html/ti230518.htm')
  .then(response => response.text())
  .then(html => {
    // Process the HTML here
    const dom = new jsdom.JSDOM(html)
    const mainSection = dom.window.document.querySelector('.WordSection1')

    const juryCases = {}
    let currentJury = ''

    // The following code iterates through each item in the jury file and uses the previous variables to
    // keep track of which files corespond to which jury and change jury when a new section is reached
    for (const child of mainSection.children) {
      // @ts-ignore
      if (child.tagName === 'DIV') {
        juryCases[child.textContent] = []
        currentJury = child.textContent
      } else if (child.tagName === 'TABLE') {
        const jsonTableData = tabletojson.convert(child.outerHTML)
        const jsonTableDataFlat = jsonTableData.flat(1)
        juryCases[currentJury].push(jsonTableDataFlat)
      }
    }

    // Flatten out each array for each jury
    const flattenedJuryFilesObj = Object.entries(juryCases).map(item => {
      return {
        key: item[0],
        files: item[1].flat(),
      }
    })
  })
  .catch(error => {
    console.error('Error fetching HTML:', error)
  })
