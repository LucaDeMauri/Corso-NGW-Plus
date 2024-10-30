import datetime
import json
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
import re
from minio import Minio
from minio.error import S3Error

logging.basicConfig(level=logging.INFO)

chrome_driver_path = r"C:\NGW+\selenium\chromedriver-win64\chromedriver.exe"

service = Service(chrome_driver_path)

options = Options()

PATH = r"C:\Users\lucdm\Downloads\documenti"

options.add_experimental_option("prefs", {
    "download.default_directory": PATH,
    "directory_upgrade": True,
    "profile.default_content_settings.popups": 0,
    "plugins.always_open_pdf_externally": True,
    "safebrowsing.enabled": True  })

driver = Chrome(service=service, options=options)

driver.get("https://www.albopretorionline.it/campania/alboente.aspx")

data = []

date_pattern = r"\b\d{2}\-\d{2}\-\d{4}\b"
act_number_pattern = r"\b(\d{3})\/\b"

def clicca_ricerca(driver):
    try:
        search = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input#btCerca"))
        )
        search.click()
        logging.info("Bottone 'Cerca' cliccato con successo.")
    except NoSuchElementException:
        logging.error("Il bottone 'Cerca' non è stato trovato.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")

def estrai_informazioni(driver):
    try:
        container = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div#centercol"))
        )
        lista_elementi = container.find_elements(By.CSS_SELECTOR, "ul li")
        
        for li in lista_elementi:
            link_element = li.find_element(By.CSS_SELECTOR, "a")
            file_name = link_element.text
            file_url = link_element.get_attribute("href")
            text = li.text
            dates = re.findall(date_pattern, text)
            act_number = re.findall(act_number_pattern, text)
            date = datetime.datetime.now().strftime("%Y-%m-%d")

            start_date = dates[0] if len(dates) > 0 else "Non disponibile"
            end_date = dates[1] if len(dates) > 1 else "Non disponibile"
            act_number = act_number[0] if len(act_number) > 0 else "Non disponibile"
            
            data.append({
                "file_name": file_name,
                "file_url": file_url,
                "start_date": start_date,
                "end_date": end_date,
                "act_number": act_number,
                "date": date
            })

    except NoSuchElementException:
        logging.error("Gli elementi non sono stati trovati.")
    except Exception as e:
        logging.error(f"Errore imprevisto: {str(e)}")

# ho deciso di convertire la lista di dizionari in un file json per facilitare la manutenzione
    with open("data.json", "w") as f:
        json.dump(data, f, indent=4)

def scarica_documenti(driver, download_folder, minio_client):
    document_links = []
    try:
        container = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div#centercol"))
        )
        lista_elementi = container.find_elements(By.CSS_SELECTOR, "ul li")
        
        for li in lista_elementi:
            link_element = li.find_element(By.CSS_SELECTOR, "a")
            file_name = link_element.text.split(".pdf")[0] + ".pdf"
            file_url = link_element.get_attribute("href")
            document_links.append(file_url)

            if os.path.exists(os.path.join(download_folder, file_name)):
                logging.info(f"File {file_name} già scaricato.")
            else:
                response = requests.get(file_url)
                with open(os.path.join(download_folder, file_name), 'wb') as file:
                    file.write(response.content)
                logging.info(f"Scaricato: {file_name}")

            upload_to_minio(minio_client, file_name, os.path.join(download_folder, file_name))

    except TimeoutException:
        logging.error("Timeout: Impossibile trovare i link ai documenti PDF entro il tempo stabilito.")
    except Exception as e:
        logging.error(f"Errore durante il download dei documenti: {str(e)}", exc_info=True)

def upload_to_minio(minio_client, file_name, file_path):
    try:
        bucket_name = "albo-pretorio"

        object_name = f"REGIONE_CAMPANIA/ALBO_PRETORIO/{file_name}"
        
        minio_client.fput_object(bucket_name, object_name, file_path)
        logging.info(f"File '{file_name}' caricato in MinIO con percorso '{object_name}'.")

    except S3Error as e:
        logging.error(f"Errore durante il caricamento in MinIO: {str(e)}", exc_info=True)

minio_client = Minio(
    "localhost:9000",      
    access_key="U7IrFr5sEWvCqNR0ftIt",      
    secret_key="0edlZsFN96RJqoFfQUKwvmg4K23bVcd7pHoXuFrS",  
    secure=False  
)

clicca_ricerca(driver)
estrai_informazioni(driver)
scarica_documenti(driver, PATH, minio_client)
