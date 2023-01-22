const customViewportCorrectionVariable = 'vh'

function setViewportProperty(doc) {
  let prevClientHeight
  let customVar = '--' + ( customViewportCorrectionVariable || 'vh' )
  
  function handleResize() {
    const clientHeight = doc.clientHeight
    
    if (clientHeight === prevClientHeight) return

    requestAnimationFrame(function updateViewportHeight(){
      doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px')
      prevClientHeight = clientHeight
    })
  }
  
  handleResize()
  
  return handleResize
}

window.addEventListener('resize', setViewportProperty(document.documentElement))