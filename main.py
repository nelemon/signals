import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram.filters import Command
from aiogram import F

# Включаем логирование
logging.basicConfig(level=logging.INFO)

# Инициализация бота
API_TOKEN = "5535400021:AAGBvV715l5rzdz4-0Teslview5w-Qo_5sQ"
bot = Bot(token=API_TOKEN)
dp = Dispatcher()

# Хэндлер для команды /start
@dp.message(Command('start'))
async def start_command(message: types.Message):
    # Создаем клавиатуру с Web App кнопкой
    web_app_url = "https://nelemon.github.io/signals/"
    web_app_button = InlineKeyboardButton(text="Open Mini App", web_app=WebAppInfo(url=web_app_url))
    
    # Создаем клавиатуру и добавляем кнопку
    keyboard = InlineKeyboardMarkup(inline_keyboard=[[web_app_button]], row_width=1)
    
    await message.answer("Привет! Нажми на кнопку ниже, чтобы открыть мини-приложение.", reply_markup=keyboard)

# Основной цикл бота
async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
