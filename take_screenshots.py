import asyncio
from playwright.async_api import async_playwright
import os

async def capture_screenshots():
    # Ensure directory exists
    os.makedirs('docs/images', exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Use a large viewport for enterprise look
        context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await context.new_page()
        
        print("Navigating to login...")
        await page.goto("http://localhost:3000/")
        await page.wait_for_selector("input#username")
        
        print("Taking login screenshot...")
        await page.screenshot(path="docs/images/01_login.png", full_page=True)
        
        print("Logging in...")
        await page.fill("input#username", "admin")
        await page.fill("input#password", "password123")
        await page.click("button[type='submit']")
        
        print("Waiting for dashboard to load...")
        # Wait for the dashboard header to appear
        await page.wait_for_selector("text=Dashboard Overview")
        # Give it a second to render data
        await page.wait_for_timeout(2000)
        
        print("Taking dashboard screenshot...")
        await page.screenshot(path="docs/images/02_dashboard.png", full_page=True)
        
        # Navigate to Transactions list (Wait, Dashboard has it all, but let's check menu)
        print("Navigating to Create Transaction...")
        await page.click("text=Create Transaction")
        await page.wait_for_selector("text=New Transaction")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="docs/images/03_create_transaction.png", full_page=True)
        
        print("Navigating to AI Assistant...")
        await page.click("text=AI Assistant")
        await page.wait_for_selector("text=AI Text Summarization")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="docs/images/04_ai_assistant.png", full_page=True)
        
        print("Navigating to RPA Automation...")
        await page.click("text=RPA Automation")
        await page.wait_for_selector("text=Trigger internal Playwright bots")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="docs/images/05_rpa_automation.png", full_page=True)
        
        print("Navigating to WebSocket Monitor...")
        await page.click("text=WebSocket Monitor")
        await page.wait_for_selector("text=System Event Monitor")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="docs/images/06_websocket_monitor.png", full_page=True)
        
        print("All screenshots captured successfully in docs/images/")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(capture_screenshots())
