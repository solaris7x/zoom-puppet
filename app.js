const puppeteer = require('puppeteer')

const sleep = seconds => {
  return new Promise(resolve => setTimeout(resolve, 1000 * 60 * seconds))
}

;(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation()

    await page.goto('https://zoom.us/signin')

    //await page.setViewport({ width: 1536, height: 722 })

    await navigationPromise

    await page.type('.form > #login-form #email', 'playx.store2@gmail.com')
    await page.type('.form > #login-form #password', 'Qwerty132')

    await page.waitForSelector(
      '#login-form > .form-group > .controls > .signin > .btn'
    )
    await page.click('#login-form > .form-group > .controls > .signin > .btn')

    await Promise.all([
      await navigationPromise,
      await page.waitForSelector('#revokeToken')
    ])

    const lecpage = await browser.newPage()
    await lecpage.goto('https://zoom.us/wc/join/2314205341')
    await navigationPromise

    await lecpage.waitForSelector('#joinBtn')
    await lecpage.click('#joinBtn')
    await navigationPromise

    //await page.waitForNavigation();
    //await page.waitForNavigation({ waitUntil: 'networkidle2' })
    //console.log(await lecpage.content())
    await lecpage.screenshot({ path: 'screenshot.png' })

    await sleep(1)
    await browser.close()
  } catch (er) {
    console.error(er)
  }
})()
