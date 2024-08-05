import json
import requests
import tkinter as tk
from tkinter import filedialog
from tkinter import messagebox

LicenseCode = '04A48130-F6E5-4DB5-BC15-DF8F05D5E907'
UserName = 'LEWISTHEDUKE'

def select_file():
  root = tk.Tk()
  root.withdraw()  
  file_path = filedialog.askopenfilename(
    title="Select an Image or PDF",
    filetypes=[("Image files", "*.jpg;*.jpeg;*.png;*.pdf"), ("All files", "*.*")]
  )
  return file_path

def ocr_image(file_path):
  RequestUrl = "http://www.ocrwebservice.com/restservices/processDocument?gettext=true"

  with open(file_path, 'rb') as image_file:
    image_data = image_file.read()

  response = requests.post(RequestUrl, data=image_data, auth=(UserName, LicenseCode))

  if response.status_code == 401:
    print("Unauthorized request")
    return

  jobj = json.loads(response.content)

  ocrError = str(jobj.get("ErrorMessage", ""))
  
  if ocrError:
    print("Recognition Error: " + ocrError)
    return

  print(str(jobj.get("OCRText", [["N/A"]])[0][0])
    .replace(" ", "")
    .replace("(", "")
    .replace(")", "")
    .replace("A", ".A ")
    .replace("B", ".B ")
    .replace("C", ".C ")
    .replace("D", ".D "))

if __name__ == "__main__":
  file_path = select_file()
  if file_path:
    ocr_image(file_path)
  else:
    print("No file selected.")
