// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
// import "./src/style.css"
import "./src/assets/css/common.scss"

// Highlighting for code blocks
import "prismjs/themes/prism.css"


document.addEventListener("scroll", (e) => {

  if(window.scrollY > 100) {
    console.log('a', e);
  }
})

