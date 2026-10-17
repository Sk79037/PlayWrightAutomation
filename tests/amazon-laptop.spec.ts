
import { test, expect } from '@playwright/test';

test('Search laptop on Amazon and open first product', async ({ page }) => {

    await page.goto('https://www.amazon.in/');


    const searchBox = page.locator('#twotabsearchtextbox');
    await searchBox.fill('laptop');
    await searchBox.press('Enter');

    const searchResults = page.locator(
        'div[data-component-type="s-search-result"]'
    );

    await expect(searchResults.first()).toBeVisible();

    await page.mouse.wheel(0, 600);

    const firstTitleLink = page.locator(
        'div[data-component-type="s-search-result"] a[href*="/dp/"]:has(h2)'
    ).first();

    await expect(firstTitleLink).toBeVisible();

    console.log('Selected product:', await firstTitleLink.innerText());
    console.log('Product URL:', await firstTitleLink.getAttribute('href'));

        const [productPage] = await Promise.all([
        page.context().waitForEvent('page'),
        firstTitleLink.click()
    ]);

  
    await productPage.waitForLoadState('domcontentloaded');


    await expect(productPage).toHaveURL(/\/dp\//);

    console.log('Product page URL:', productPage.url());
    console.log('Product page title:', await productPage.title());


});
