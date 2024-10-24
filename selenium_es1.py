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

driver.get("https://www.arpalazio.it/")

# Impostazione di un tempo di attesa per il caricamento della pagina
driver.implicitly_wait(10)

def accetta_cookie(driver):
    try:
        # Trova il bottone per accettare i cookie
        button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'button.acceptcookies'))
        )
        # Forza il click con JavaScript
        driver.execute_script("arguments[0].click();", button)
        logging.info("Cookie accettati con successo.")
    except NoSuchElementException:
        logging.error("Il bottone per accettare i cookie non è stato trovato.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")

def clicca_bottone_servizi(driver):
    try:
        # Trova il bottone "Servizi"
        button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'button#Servizi'))
        )
        # Forza il click con JavaScript
        driver.execute_script("arguments[0].click();", button)
        logging.info("Bottone 'Servizi' cliccato con successo.")
    except NoSuchElementException:
        logging.error("Il bottone 'Servizi' non è stato trovato.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")

def clicca_link_tariffario(driver):
    try:
        # Attendi che il link "Tariffario" sia visibile
        link = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'a[aria-label="Tariffario"]'))
        )
        # Clicca sul link
        link.click()
        logging.info("Link 'Tariffario' cliccato con successo.")
        WebDriverWait(driver, 10).until(EC.title_contains("Tariffario"))
        accetta_cookie(driver)
    except NoSuchElementException:
        logging.error("Il link 'Tariffario' non è stato trovato.")
    except ElementClickInterceptedException:
        logging.error("Il click sul link 'Tariffario' è stato bloccato.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")



def scarica_documenti(driver, download_folder):
    try:
        document_links = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//a[contains(@href, '.pdf')]"))
        )
        downloaded_files = []

        for link in document_links:
            file_url = link.get_attribute("href")
            file_name = file_url.split("/")[-1]
            downloaded_files.append(file_name)

            # Salva i nomi dei documenti in un file di log
        with open(os.path.join(download_folder, "documenti_scaricati.txt"), "w") as log_file:
            for file in downloaded_files:
                log_file.write(f"{file}\n")

            # controlla se il file è già stato scaricato
        for file_name in downloaded_files:
            if os.path.exists(os.path.join(download_folder, file_name)):
                logging.info(f"File {file_name} già scaricato.")
                continue

            # scarica il file
            response = requests.get(file_url)
            with open(os.path.join(download_folder, file_name), 'wb') as file:
                file.write(response.content)

            logging.info(f"Scaricato: {file_name}")
        
    except Exception as e:
        logging.error(f"Errore durante il download dei documenti: {str(e)}", exc_info=True)

# Esegui le funzioni precedenti e scarica i documenti
accetta_cookie(driver)
clicca_bottone_servizi(driver)
clicca_link_tariffario(driver)
scarica_documenti(driver, PATH)

# Chiudi il browser al termine
driver.quit()
