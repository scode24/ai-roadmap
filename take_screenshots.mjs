import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set desktop viewport
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Wait for Onboarding Modal and enter name
    console.log('Waiting for Onboarding modal...');
    await page.waitForSelector('input[type="text"]');
    
    console.log('Entering username...');
    await page.type('input[type="text"]', 'Alex Chen');
    await page.click('button[type="submit"]');

    // Wait for modal animation to finish
    await new Promise(r => setTimeout(r, 1000));

    // Take Desktop screenshot
    await page.screenshot({ path: 'public/desktop_dashboard.png' });
    console.log('Desktop screenshot taken');

    // Switch to Mobile view
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    
    // Switch to Profile Tab
    const profileTabSelector = 'button:has(span:contains("Profile"))';
    // Let's just click by coordinates or evaluate
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const profileBtn = buttons.find(b => b.textContent === 'Profile');
      if(profileBtn) profileBtn.click();
    });

    // Wait a bit for layout to settle
    await new Promise(r => setTimeout(r, 500));
    
    // Take Mobile screenshot
    await page.screenshot({ path: 'public/mobile_dashboard.png' });
    console.log('Mobile screenshot taken');

    await browser.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
