import os
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Images
from django.db import transaction
from anime.models import Anime, AnimeEspisode
from anime.serializers import AnimeEspisodeSerializer
from users.models import Users
import base64


class AddImagesAnime(APIView):
    def post(self, request):
        try:
            anime_id = request.data['anime_id']
            anime = Anime.objects.get(id=anime_id)
            image_file1 = request.FILES['avatar']
            image_file2 = request.FILES['background']
            image_file3 = request.FILES['logo']

            with image_file1.open('rb') as f:
                avatar_binary_data = f.read()
            with image_file2.open('rb') as f:
                background_binary_data = f.read()
            with image_file3.open('rb') as f:
                logo_binary_data = f.read()

            # Convert binary data to base64 strings
            avatar_base64 = base64.b64encode(
                avatar_binary_data).decode('utf-8')
            background_base64 = base64.b64encode(
                background_binary_data).decode('utf-8')
            logo_base64 = base64.b64encode(
                logo_binary_data).decode('utf-8')

            with transaction.atomic():
                avatar_add = Images.objects.create(
                    animeid=anime, category="avatar", url=avatar_base64)
                background_add = Images.objects.create(
                    animeid=anime, category="background", url=background_base64)
                logo_add = Images.objects.create(
                    animeid=anime, category="logo", url=logo_base64)

            return Response({"message": "Images added successfully"})
        except Exception as e:
            # Log the error details for debugging
            print(f"Error adding images: {e}")
            # Return an error response
            return Response({"error": "Failed to add images"}, status=500)


class AddImagesEspisodeForAll(APIView):
    def post(self, request):
        try:
            anime_id = request.data['anime_id']
            image_file = request.FILES['espisode']
            anime = Anime.objects.get(id=anime_id)
            animeEspisodes = AnimeEspisode.objects.filter(animeid=anime)

            with image_file.open('rb') as f:
                espisode_binary_data = f.read()

            espisode_base64 = base64.b64encode(
                espisode_binary_data).decode('utf-8')

            for animeEspisode in animeEspisodes:
                with transaction.atomic():
                    espisode_add = Images.objects.create(
                        espisodeid=animeEspisode, category="Espisode Img", url=espisode_base64)
            return Response({"message": "Images espisode add success"})
        except Exception as e:
            print(f"Error adding images for espisode: {e}")


def get_all_image_anime(anime_id):
    try:
        anime = Anime.objects.get(pk=anime_id)
        images = Images.objects.filter(animeid=anime)

        # Create the directory if it doesn't exist
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        photo_store_dir = os.path.join(BASE_DIR, 'photoStore')
        if not os.path.exists(photo_store_dir):
            os.makedirs(photo_store_dir)
        imgs = {}
        # Iterate through each image data
        for image in images:
            # Get the image path from the database
            image_path = os.path.join(
                photo_store_dir, f"{image.id}_{image.category}.jpg")

            # Decode base64 encoded image data
            image_data_bytes = base64.b64decode(image.url)

            # Write the binary image data to a file
            with open(image_path, 'wb') as f:
                f.write(image_data_bytes)  # Write the image data to the file
            imgs[image.category] = f'http://127.0.0.1:8000/img/{image.id}_{image.category}.jpg'
        return imgs
    except Exception as e:
        print(f"Error getting images: {e}")


def get_user_img(user_id):
    try:
        user = Users.objects.get(pk = user_id)
        image = Images.objects.get(userid=user)
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        photo_store_dir = os.path.join(BASE_DIR, 'photoStore')
        if not os.path.exists(photo_store_dir):
            os.makedirs(photo_store_dir)
        image_path = os.path.join(
            photo_store_dir, f"user_{user_id}.jpg")

        # Decode base64 encoded image data
        image_data_bytes = base64.b64decode(image.url)
        # Write the binary image data to a file
        with open(image_path, 'wb') as f:
            f.write(image_data_bytes)
        return{
            'url': f'http://127.0.0.1:8000/img/user_{user_id}.jpg'
        }
    except Exception as e:
        print(f"Error getting images: {e}")



def get_all_anime_espisode_image(anime_id):
    try:
        anime = Anime.objects.get(pk=anime_id)
        animeEspisodes = AnimeEspisode.objects.filter(animeid=anime)
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        photo_store_dir = os.path.join(BASE_DIR, 'photoStore')
        if not os.path.exists(photo_store_dir):
            os.makedirs(photo_store_dir)
        imgs = []
        for animeEspisode in animeEspisodes:
            image = Images.objects.get(espisodeid=animeEspisode)
            image_path = os.path.join(
                photo_store_dir, f"Espisode_{image.id}.jpg")

            image_data_bytes = base64.b64decode(image.url)
            with open(image_path, 'wb') as f:
                f.write(image_data_bytes)
            img = {'espisode': animeEspisode.espisode, 'time': animeEspisode.time, 'dateUp': animeEspisode.dateup,
                   'url': f'http://127.0.0.1:8000/img/Espisode_{image.id}.jpg'}
            imgs.append(img)
        return imgs
    except Exception as e:
        print(f"Error getting images: {e}")
