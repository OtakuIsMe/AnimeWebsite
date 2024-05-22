from rest_framework import serializers
from .models import Type, Season, Showtimes, AnimeSeries, Anime, Studio, StudioAnime, TypeAnime, Director, DirectorAnime, Author, AuthorAnime, AnimeCharacter, AnimeEspisode, AnimeName, FollowAnime, HistoryAnime

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = '__all__'

class ShowtimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Showtimes
        fields = '__all__'

class AnimeSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeSeries
        fields = '__all__'

class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'

class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = '__all__'

class StudioAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudioAnime
        fields = '__all__'

class TypeAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeAnime
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class DirectorAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectorAnime
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class AuthorAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorAnime
        fields = '__all__'

class AnimeCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeCharacter
        fields = '__all__'
class AnimeEspisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeEspisode
        fields = '__all__'
class AnimeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeName
        fields = '__all__'
class FollowAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowAnime
        fields = '__all__'
class HistoryAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryAnime
        fields = '__all__'