import { test, expect } from '@playwright/test';

test('Create a new user account', async ({ page }) => {
  await page.goto('/login');

  // Generate a unique name and email using a timestamp
  const uniqueIdentifier = Date.now();
  const uniqueName = `User${uniqueIdentifier}`;
  const uniqueEmail = `guppapacaja-6728+${uniqueIdentifier}@yopmail.com`;
  const userPassword = 'Test-1234';

  //navigate to homepage
  await expect(page.getByRole('heading',{ name: 'Learn Automation Courses' })).toBeVisible();
  await expect(page.getByRole('heading',{ name: 'Sign In' })).toBeVisible();
  await page.getByRole('link',{ name: 'New user? Signup' }).click();

  // Fill up the signup form
  await expect(page.getByRole('heading',{ name: 'Sign Up' })).toBeVisible();
  await page.getByPlaceholder('Name').fill(uniqueName);
  await page.getByPlaceholder('Email').fill(uniqueEmail);
  await page.getByPlaceholder('Password').fill(userPassword);
  await page.getByLabel('Playwright').click();
  await page.locator('#state').selectOption('Arunachal Pradesh');
  await page.locator('#hobbies').selectOption('Swimming');

  //Click the Sign up button
  await page.getByRole('button', { name: 'Sign up' }).click();

  //Verify flash message after successful signup and redirection 
  await expect(page.getByText('Signup successfully, Please login!')).toBeVisible();
  await expect(page).toHaveURL(/\/login/);

  //loging as recently created user
  await expect(page.getByRole('heading',{ name: 'Sign In' })).toBeVisible();
  await page.getByPlaceholder('Enter Email').fill(uniqueEmail);
  await page.getByPlaceholder('Enter Password').fill(userPassword);

  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('.welcomeMessage')).toBeVisible({timeout: 10000});
});