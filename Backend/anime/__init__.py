import os
import firebase_admin
from firebase_admin import credentials
json_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'config', 'animewebsite-2f080-firebase-adminsdk-si2gi-f62ee7bca3.json')
cred = credentials.Certificate(json_path)
firebase_admin.initialize_app(cred)