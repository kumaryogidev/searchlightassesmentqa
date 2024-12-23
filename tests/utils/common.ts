import { test, expect } from '@playwright/test';

// Constants for login data
const EMAIL = 'guppapacaja-6728@yopmail.com';
const PASSWORD = 'Test-1234';

// Utility function to log in
const login = async (page: any) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await page.getByPlaceholder('Enter Email').fill(EMAIL);
    await page.getByPlaceholder('Enter Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('.welcomeMessage')).toBeVisible({ timeout: 10000 });
};

// Utility function to extract price from text
const extractPrice = (priceText: string | null): number => {
    if (!priceText) throw new Error('Price text is null');
    return parseInt(priceText.split('₹')[1], 10);
};

// Utility function to add a course to cart
const addCourseToCart = async (page: any, index: number) => {
    const courseCard = page.locator('.home-container .course-card').nth(index);
    await expect(courseCard.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
    await courseCard.getByRole('button', { name: 'Add to Cart' }).click();
    await expect(courseCard.getByRole('button', { name: 'Remove from Cart' })).toBeVisible();
};

// Utility function to remove a course from cart
const removeCourseFromCart = async (page: any, index: number) => {
    const courseCard = page.locator('.cart-container .course-card').nth(index);
    await courseCard.getByRole('button', { name: 'Remove from Cart right arrow' }).click();
};

export {
    EMAIL,
    PASSWORD,
    login,
    extractPrice,
    addCourseToCart,
    removeCourseFromCart
}