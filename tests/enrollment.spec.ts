import { test, expect } from '@playwright/test';
import { login, extractPrice, addCourseToCart, removeCourseFromCart } from './utils/common';

// Constants for test data
const ADDRESS = '93 Tuam Road, London, SE18 2QY';
const PHONE = '+44744067689';

// Test: Enroll in training courses
test('Enroll in training courses', async ({ page }) => {
    await login(page);

    // Add courses to cart and verify changes
    const coursesToAdd = 3;
    for (let i = 0; i < coursesToAdd; i++) {
        await addCourseToCart(page, i);
        await expect(page.locator('nav .count')).toHaveText((i + 1).toString());
    }

    // Navigate to cart page and verify courses
    await page.locator('.cartBtn').click();
    await expect(page).toHaveURL(/\/cart/);
    await expect(page.getByRole('heading', { name: 'Total Price:' })).toBeVisible();
    await expect(page.locator('.course-card')).toHaveCount(coursesToAdd);

    // Proceed to enroll
    await page.getByRole('button', { name: 'Enroll Now' }).click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await page.locator('#address').fill(ADDRESS);
    await page.locator('#phone').fill(PHONE);
    await page.locator('.modal-content .modal-footer').getByText('Enroll Now').click();
    await expect(page.locator('.modal-content .modal-footer').getByText('Enrolling')).toBeVisible();

    // Verify order ID
    await expect(page.locator('.uniqueId')).toContainText('Your order id is ');
    await page.locator('.modal-content .btn-close').click();
    await expect(page.locator('.modal-content')).not.toBeVisible();
});

// Test: Verify total amount in cart based on addition/removal
test('Verify total amount in cart page is correct based on addition or removal of items', async ({ page }) => {
    await login(page);

    // Add a course to cart
    const firstCourseCard = page.locator('.home-container .course-card').nth(0);
    await addCourseToCart(page, 0);
    const firstCoursePrice = extractPrice(await firstCourseCard.locator('#cardChip b').textContent());

    // Navigate to cart page and verify details
    await page.locator('.cartBtn').click();
    await expect(page).toHaveURL(/\/cart/);
    await expect(page.getByRole('heading', { name: 'Total Price:' })).toBeVisible();
    await expect(page.locator('.course-card')).toHaveCount(1);

    const totalCartAmount = extractPrice(await page.locator('h3 b').textContent());
    expect(totalCartAmount).toEqual(firstCoursePrice);

    // Remove the course and verify the cart is empty
    await removeCourseFromCart(page, 0);
    const updatedCartAmount = extractPrice(await page.locator('h3 b').textContent());
    expect(updatedCartAmount).toEqual(0);
});
