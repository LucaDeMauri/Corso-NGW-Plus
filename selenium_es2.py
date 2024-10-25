from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException, TimeoutException 
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import Chrome
import requests
import logging
import os
import time

# Configurazione del logger
logging.basicConfig(level=logging.INFO)

# Percorso del driver di Chrome specifico
chrome_driver_path = r"C:\NGW+\selenium\chromedriver-win64\chromedriver.exe"

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

def inserisci_prodotto(driver):
    try:
        input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "twotabsearchtextbox"))
        )
        input.send_keys("playstation 5")
        logging.info("Prodotto inserito con successo.")
    except NoSuchElementException:
        logging.error("Il bottone per accettare i cookie non è stato trovato.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")

def clicca_ricerca(driver):
    try:
        search = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input#nav-search-submit-button"))
        )
        search.click()
        logging.info("Bottone 'Cerca' cliccato con successo.")
    except NoSuchElementException:
        logging.error("Il bottone 'Cerca' non è stato trovato.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")

def estrai_prodotto(driver):
    try:
        # Individua i prodotti utilizzando il selettore CSS
        products = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "span.a-size-base-plus.a-color-base.a-text-normal"))
        )
        if not products:
            logging.error("Nessun prodotto trovato.")
            return
        
        limited_products = products[:10]
        i = 0

        for product in limited_products:
            logging.info("il prodotto è: "+ product.text)
            try:
                price_whole = WebDriverWait(driver, 10).until( EC.presence_of_all_elements_located((By.CSS_SELECTOR, "span.a-price-whole")))
                price_fraction = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "span.a-price-fraction")))

                
                full_price = f"{price_whole[i].text},{price_fraction[i].text} €"
                logging.info("il prezzo è di: "+ full_price)
                i += 1
            except Exception as e:
                logging.error(f"Errore nel prendere il prezzo: {str(e)}")



            #il codice commentato è la mia prova di entrare in un determinato prodotto estrarre tutti i dettagli
            #uscire ed entrare un altro prodotto, ma dopo aver stampato i dettagli del primo non riesce ad entrare nel secondo

            # product.click()
            #     # Trova i dettagli del prodotto
            # details_list = driver.find_elements(By.CSS_SELECTOR, "ul.a-unordered-list.a-nostyle.a-vertical.a-spacing-none li")
            # for detail in details_list:
            #     try:
            #         detail_text = detail.find_element(By.CSS_SELECTOR, "span.a-list-item").text
            #         logging.info("      " + detail_text)
            #     except Exception as e:
            #         logging.warning(f"Errore nel recuperare il dettaglio: {str(e)}")

            # # Torna alla pagina dei risultati di ricerca
            # driver.back()

            # # Aspetta che la pagina dei risultati si ricarichi correttamente
            # WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "twotabsearchtextbox")))


    except NoSuchElementException:
        logging.error("I prodotti non sono stati trovati.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")





accetta_cookie(driver)
inserisci_prodotto(driver)
clicca_ricerca(driver)
estrai_prodotto(driver)