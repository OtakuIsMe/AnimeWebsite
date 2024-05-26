from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Type, Season, AnimeEspisode, Anime, AnimeName, TypeAnime, Showtimes, FollowAnime, HistoryAnime
from users.models import Users
from .serializers import TypeSerializer, SeasonSerializer, AnimeEspisodeSerializer, AnimeSerializer, AnimeNameSerializer, TypeAnimeSerializer, ShowtimesSerializer, FollowAnimeSerializer, HistoryAnimeSerializer
from images import views as imagesView
from django.utils import timezone
from django.db.models import Max
from firebase_admin import storage
from django.conf import settings
import re
import os
import subprocess
import shutil
# Create your views here.


class get_all_type(APIView):
    def get(self, request):
        types = Type.objects.all()
        serializer = TypeSerializer(types, many=True)
        return Response(serializer.data)


class get_3_years_season(APIView):
    def get(self, request):
        season = Season.objects.order_by(
            '-id')[:12]  # 1 năm có 4 mùa 4 năm 12 mùa
        serializer = SeasonSerializer(season, many=True)
        return Response(serializer.data)


class get_animeEspisode_newest(APIView):
    def get(self, request, count):
        animeEspisode = AnimeEspisode.objects.order_by('-dateup')[:count]
        serializerAnimeEspisode = AnimeEspisodeSerializer(
            animeEspisode, many=True)
        anime_espisode_data = serializerAnimeEspisode.data
        combined_data = []
        for espisode in anime_espisode_data:
            images = imagesView.get_all_image_anime(espisode['animeid'])
            anime = Anime.objects.get(id=espisode['animeid'])
            serializerAnime = AnimeSerializer(anime)
            name = AnimeName.objects.get(animeid=anime, status=1)
            combined_data.append({**espisode, **serializerAnime.data, 'images': images, 'name': AnimeNameSerializer(
                name).data['name'], 'types': get_type_anime(espisode['animeid'])})
        return Response(combined_data)


def get_type_anime(animeid):
    try:
        anime = Anime.objects.get(pk=animeid)
        typeAnimes = TypeAnime.objects.filter(animeid=anime)
        types = []
        for typeAnime in typeAnimes:
            print(typeAnime.typeid)
            type = Type.objects.get(id=typeAnime.typeid.id)
            types.append(TypeSerializer(type).data)
        return types
    except Exception as e:
        print(f"Error getting anime type: {e}")


def get_anime_rating(animeid):
    try:
        avgRating = 0
        return avgRating
    except Exception as e:
        print(f"Error getting anime rating: {e}")


def get_anime_current_espisode(anime_id):
    try:
        currentEspisode = AnimeEspisode.objects.filter(animeid=Anime.objects.get(
            id=anime_id)).aggregate(max_espisode=Max('espisode'))['max_espisode']
        return currentEspisode
    except Exception as e:
        print(f"Error getting anime current espisode : {e}")


class get_anime_newest(APIView):
    def get(self, request, count):
        try:
            current_time = timezone.now()
            animes = Anime.objects.filter(showtimeid__airstart__lte=current_time, isdeleted=False).order_by(
                '-showtimeid__airstart')[:count]
            combined_data = []
            for anime in animes:
                anime_data = AnimeSerializer(anime).data
                name = AnimeName.objects.get(animeid=anime, status=1)
                anime_data['name'] = AnimeNameSerializer(name).data['name']
                anime_data['types'] = get_type_anime(anime.id)
                anime_data['rating'] = get_anime_rating(anime.id)
                anime_data['images'] = imagesView.get_all_image_anime(anime.id)
                anime_data['currentEspisode'] = get_anime_current_espisode(
                    anime.id)
                combined_data.append(anime_data)
            return Response(combined_data)
        except Exception as e:
            print(f"Error get anime newest: {e}")


class get_anime_upcoming(APIView):
    def get(self, request, count):
        try:
            current_time = timezone.now()
            animes = Anime.objects.filter(showtimeid__airstart__gt=current_time, isdeleted=False).order_by(
                'showtimeid__airstart')[:count]
            combined_data = []
            for anime in animes:
                anime_data = AnimeSerializer(anime).data
                anime_data['types'] = get_type_anime(anime.id)
                anime_data['rating'] = get_anime_rating(anime.id)
                combined_data.append(anime_data)
            return Response(combined_data)
        except Exception as e:
            print(f"Error get anime upcoming: {e}")


class get_anime_by_name(APIView):
    def get(self, request, anime_name):
        try:
            x = anime_name.split("-")
            anime_name_string = ''
            for elementX in x:
                anime_name_string = anime_name_string + elementX + ' '
            print(anime_name_string)
            animeName = AnimeName.objects.get(
                name__iexact=anime_name_string.strip())
            anime = animeName.animeid
            anime_data = AnimeSerializer(anime).data
            anime_data['images'] = imagesView.get_all_image_anime(anime.id)
            anime_data['types'] = get_type_anime(anime.id)
            anime_data['name'] = AnimeNameSerializer(animeName).data['name']
            anime_data['EspisodeImg'] = imagesView.get_all_anime_espisode_image(
                anime.id)
            return Response(anime_data)
        except Exception as e:
            print(f"Error get anime by name{e}")


class add_anime_espisode_video(APIView):
    def post(self, request):
        try:
            anime_id = request.data['anime_id']
            espisode = request.data['espisode']
            video = request.FILES['video']

            # Lấy thông tin AnimeName từ ID của Anime và status=1
            anime_name = AnimeName.objects.get(animeid=anime_id, status=1).name
            valid_name = re.sub(r'[^\w\s-]', '', anime_name.lower())
            valid_name = re.sub(r'[\s_]+', '-', valid_name)

            video_path = os.path.join(settings.MEDIA_ROOT, 'temp', video.name)
            with open(video_path, 'wb+') as destination:
                for chunk in video.chunks():
                    destination.write(chunk)
            output_dir = os.path.join(
                settings.MEDIA_ROOT, 'hls', 'video')

            os.makedirs(output_dir, exist_ok=True)
            output_path = os.path.join(output_dir, 'index.m3u8')
            ffmpeg_command = [
                'ffmpeg',
                '-i', video_path,
                '-c', 'copy',
                '-start_number', '0',
                '-hls_time', '10',
                '-hls_list_size', '0',
                '-f', 'hls',
                output_path
            ]
            subprocess.run(ffmpeg_command, check=True)

            # Tải video lên Firebase Storage
            bucket = storage.bucket("animewebsite-2f080.appspot.com")
            blob_base_path = f"anime/{valid_name}/Espisode/{espisode}/"

            # Upload all files in the output_dir to Firebase Storage
            for root, dirs, files in os.walk(output_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    blob_path = os.path.join(blob_base_path, file)
                    blob = bucket.blob(blob_path)
                    blob.upload_from_filename(
                        file_path, content_type='video/mp2t' if file.endswith('.ts') else 'application/x-mpegURL')

            videoUrl = f'https://storage.googleapis.com/animewebsite-2f080.appspot.com/{blob_base_path}index.m3u8'

            anime = Anime.objects.get(pk=anime_id)
            animeEspisode = AnimeEspisode.objects.filter(
                espisode=espisode, animeid=anime)
            if animeEspisode:
                animeEspisode[0].video = videoUrl
                animeEspisode[0].save()
            else:
                AnimeEspisode.objects.create(espisode=espisode, animeid=anime, dateup=timezone.now(
                ), isdeleted=0, time=23, video=videoUrl)

            # Cleanup the temporary video file
            os.remove(video_path)
            shutil.rmtree(output_dir)
            return Response({'message': "Added successful"})
        except Exception as e:
            print(f"Error add video: {e}")
            return Response({'message': 'Error add video'})


class get_anime_espisode_video(APIView):
    def get(self, request):
        try:
            anime_id = request.query_params.get('animeid')
            espisode = request.query_params.get('episode')

            anime = Anime.objects.get(pk=anime_id)
            animeEspisode = AnimeEspisode.objects.get(
                animeid=anime, espisode=espisode)

            return Response({'videoUrl': animeEspisode.video})
        except Exception as e:
            print(f'Error getting video: {e}')
            return Response({'message': 'Error getting video'})


class search_anime(APIView):
    def post(self, request):
        try:
            key = request.data['key']
            animeNames = AnimeName.objects.filter(name__icontains=key)
            animes = []
            for animeName in animeNames:
                if animeName.animeid not in [a for a in animes]:
                    animes.append(animeName.animeid)
            animeDatas = []
            for anime in animes:
                animeData = AnimeSerializer(anime).data
                name = AnimeName.objects.get(animeid=anime, status=1)
                animeData['images'] = imagesView.get_all_image_anime(anime.id)
                animeData['name'] = AnimeNameSerializer(name).data['name']
                animeDatas.append(animeData)
            return Response(animeDatas)
        except Exception as e:
            print(f'Error search anime: {e}')
            return Response({'message': 'Error search anime'})


class filter_anime_by_type(APIView):
    def get(self, request):
        try:
            filter = request.query_params.get('filter')
            typeAnimes = TypeAnime.objects.filter(
                typeid=Type.objects.get(name=filter))
            animes_data = []
            for typeAnime in typeAnimes:
                anime = typeAnime.animeid
                name = AnimeName.objects.get(animeid=anime, status=1)
                anime_data = AnimeSerializer(anime).data
                anime_data['images'] = imagesView.get_all_image_anime(anime.id)
                anime_data['name'] = AnimeNameSerializer(name).data['name']
                animes_data.append(anime_data)
            return Response(animes_data)
        except Exception as e:
            print(f'Error filter anime: {e}')
            return Response({'message': 'Error filter anime'})


class follow_anime(APIView):
    def post(self, request):
        try:
            current_time = timezone.now()
            anime_id = request.data['anime_id']
            user_id = request.data['user_id']
            anime = Anime.objects.get(pk=anime_id)
            user = Users.objects.get(pk=user_id)
            FollowAnime.objects.create(
                animeid=anime, userid=user, datefollow=current_time)
            return Response({'message': "Follow successful"})
        except Exception as e:
            print(f'Error follow anime:{e}')
            return Response({'message': 'Error Follow anime'})


class get_anime_follow_by_user(APIView):
    def get(self, reqeust, userid):
        try:
            user = Users.objects.get(pk=userid)
            animeFollows = FollowAnime.objects.filter(userid=user)
            animes_data = []
            for animeFollow in animeFollows:
                anime = animeFollow.animeid
                name = AnimeName.objects.get(animeid=anime, status=1)
                anime_data = AnimeSerializer(anime).data
                anime_data['images'] = imagesView.get_all_image_anime(anime.id)
                anime_data['name'] = AnimeNameSerializer(name).data['name']
                animes_data.append(anime_data)
            return Response(animes_data)
        except Exception as e:
            print(f'Error get anime follow:{e}')
            return Response({'message': 'Error get anime follow'})


class add_history_anime_user(APIView):
    def post(self, request):
        try:
            user_id = request.data['userid']
            anime_id = request.data['animeid']
            espisode = request.data['espisode']
            time_continute = request.data['timeContinute']
            hours ,minutes, seconds = map(int, time_continute.split(':'))
            
            time_input = f"0 {hours:02}:{minutes:02}:{seconds:02}"
            
            anime = Anime.objects.get(pk = anime_id)
            
            animeEspisode = AnimeEspisode.objects.get(animeid = anime, espisode = espisode)
            user = Users.objects.get(pk = user_id)
            
            animeHistory, created =  HistoryAnime.objects.update_or_create(
                animeespisodeid = animeEspisode,
                userid = user,
                defaults={"timecontinues" : time_input}
            )
            if created:
                return Response("Add Record")
            else:
                return Response("Update Record")
        except Exception as e:
            print(f'Error add history anime: {e}')
            return Response({'message': 'Error add history anime'})
class get_history_anime_user(APIView):
    def post(self, request):
        try:
            user_id = request.data['userid']
            anime_id = request.data['animeid']
            espisode = request.data['espisode']
            
            anime = Anime.objects.get(pk = anime_id)
            
            animeEspisode = AnimeEspisode.objects.get(animeid = anime, espisode = espisode)
            user = Users.objects.get(pk = user_id)
            
            try:
                animeHistory= HistoryAnime.objects.get(animeespisodeid = animeEspisode,userid = user)
                return Response({'time': animeHistory.timecontinues.total_seconds()})
            except Exception as e:
                return Response({'time': 0})
        except Exception as e:
            print(f'Error get history anime: {e}')
            return Response({'message': 'Error get history anime'})
class get_user_list_anime_history(APIView):
    def get(self, request, userid):
        try:
            user = Users.objects.get(pk = userid)
            animeHistorys =HistoryAnime.objects.filter(userid = user)
            animeEspisodes = []
            animes =[]
            for animeHistory in animeHistorys:
                animeEspisodes.append(animeHistory.animeespisodeid) 
            for animeEspisode in animeEspisodes:
                if animeEspisode.animeid not in [a for a in animes]:
                    animes.append(animeEspisode.animeid)
            animeDatas = []
            for anime in animes:
                animeData = AnimeSerializer(anime).data
                name = AnimeName.objects.get(animeid=anime, status=1)
                animeData['images'] = imagesView.get_all_image_anime(anime.id)
                animeData['name'] = AnimeNameSerializer(name).data['name']
                animeDatas.append(animeData)
            return Response(animeDatas)
        except Exception as e:
            print(f'Error get history anime: {e}')
            return Response({'message': 'Error get history anime'})
