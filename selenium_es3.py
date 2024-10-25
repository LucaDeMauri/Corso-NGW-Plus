import telebot
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import Chrome
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import logging
import threading
 
# Configurazione del logger
logging.basicConfig(level=logging.INFO)
 
API_TOKEN = '7878408624:AAHjTbCB2t_JAASBAUDbv2aVsevWB1Y63ow'  # Inserisci il tuo token Telegram
bot = telebot.TeleBot(API_TOKEN)
 
# Percorso del driver di Chrome specifico
chrome_driver_path = r"C:\NGW+\Corso-NGW+\Corso-NGW-Plus\chromedriver-win64\chromedriver.exe"
 
# Funzione per avviare il driver di Selenium
def init_driver():
    service = Service(chrome_driver_path)
    options = Options()
    options.add_argument("--headless")  # Esegui il browser in modalità headless
    driver = Chrome(service=service, options=options)
    return driver

# Inizializzo il servizio con il percorso specifico del driver di Chrome
service = Service(chrome_driver_path)

# Inizializzo le opzioni del browser Chrome
options = Options()

# DIRECTORY DI DESTINAZIONE DEI FILE
PATH = r"C:\Users\lucdm\Downloads\documenti"

options.add_experimental_option("prefs", {
    "download.default_directory": PATH,
    "directory_upgrade": True,
    "profile.default_content_settings.popups": 0,
    "plugins.always_open_pdf_externally": True,
    "safebrowsing.enabled": True  # Abilita il safe browsing per evitare problemi con i download
})

# Avvio del driver di Chrome
driver = Chrome(service=service, options=options)

driver.get("https://www.amazon.it/")

# Gestione dei comandi /start e /help
@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, "Ciao! Inviami il nome di un prodotto da cercare su Amazon.")
 
# Gestione dei messaggi con testo
@bot.message_handler(func=lambda message: True)
def handle_message(message):
    product_name = message.text
    bot.reply_to(message, f"Cerco '{product_name}' su Amazon, attendi...")
 
    # Esegui lo scraping su Amazon
    products = estrai_prodotti(product_name, driver)
 
    if products:
      
        for product in products:
            try:
                bot.send_message(message.chat.id, f"Prodotto: {product['name']}\nPrezzo: {product['price']}")
            except Exception as e:
                logging.error(f"Errore nel prendere il prezzo: {str(e)}")
    else:
        bot.send_message(message.chat.id, "Non ho trovato nessun prodotto corrispondente.")
 
# Funzione per eseguire il bot in un thread separato
def run_bot():
    bot.infinity_polling()
 
# Esegui il bot in un thread separato
threading.Thread(target=run_bot).start()
# Impostazione di un tempo di attesa per il caricamento della pagina
driver.implicitly_wait(10)

def accetta_cookie(driver):
    try:
        # Trova il bottone per accettare i cookie
        button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "sp-cc-accept"))
        )
        # Forza il click con JavaScript
        driver.execute_script("arguments[0].click();", button)
        logging.info("Cookie accettati con successo.")
    except NoSuchElementException:
        logging.error("Il bottone per accettare i cookie non è stato trovato.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")

def estrai_prodotti(product_name, driver):
    all_products = []  # Lista per raccogliere tutti i prodotti
    try:
        input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "twotabsearchtextbox"))
        )
        input.click()
        driver.execute_script("arguments[0].value = '';", input)
        input.send_keys(product_name)
        input.send_keys(Keys.RETURN)  # Invia la ricerca
        logging.info("Prodotto inserito con successo.")
        
        products = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.s-main-slot div.s-result-item"))
        )
        
        products = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "span.a-size-base-plus.a-color-base.a-text-normal"))
        )
        if not products:
            logging.error("Nessun prodotto trovato.")
            return
        
        limited_products = products[:10]
        i = 0
        all_products = []

        for product in limited_products:
            try:
                price_whole = WebDriverWait(driver, 10).until( EC.presence_of_all_elements_located((By.CSS_SELECTOR, "span.a-price-whole")))
                price_fraction = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "span.a-price-fraction")))

                
                
                all_products.append({
                    "name": product.text,
                    "price": f"{price_whole[i].text},{price_fraction[i].text} €"
                })
                i += 1
            except NoSuchElementException as e:
                logging.warning(f"probabilmente funzionerà lo stesso: {str(e)}")
                continue
        
        return all_products
    except Exception as e:
        logging.error(f"Errore durante l'estrazione dei prodotti: {str(e)}")
        return []
    
accetta_cookie(driver)
