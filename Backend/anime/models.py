from django.db import models
from users.models import Users

# Create your models here.
class Type(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'type'

class Season(models.Model):
    id = models.BigIntegerField(primary_key=True)
    seasonname = models.CharField(max_length=50, blank=True, null=True)
    year = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'season'

class Showtimes(models.Model):
    id = models.BigIntegerField(primary_key=True)
    dow = models.CharField(max_length=20, blank=True, null=True)
    airtime = models.DurationField(blank=True, null=True)
    airstart = models.DateField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'showtimes'
        
class AnimeSeries(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'anime_series'
        
class Anime(models.Model):
    id = models.BigIntegerField(primary_key=True)
    seasonid = models.ForeignKey('Season', models.DO_NOTHING, db_column='seasonid', blank=True, null=True)
    showtimeid = models.ForeignKey('Showtimes', models.DO_NOTHING, db_column='showtimeid', blank=True, null=True)
    animeseriesid = models.ForeignKey('AnimeSeries', models.DO_NOTHING, db_column='animeseriesid', blank=True, null=True)
    status = models.CharField(max_length=200, blank=True, null=True)
    description = models.CharField(max_length=2000, blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    language = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    maxespisode = models.BigIntegerField(blank=True, null=True)
    isdeleted = models.BooleanField(blank=True, null=True)
    max_age = models.BigIntegerField(blank=True, null=True)
    season = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'anime'
        
class Studio(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'studio'

class StudioAnime(models.Model):
    id = models.BigIntegerField(primary_key=True)
    studioid = models.ForeignKey(Studio, models.DO_NOTHING, db_column='studioid', blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'studio_anime'

class TypeAnime(models.Model):
    id = models.BigIntegerField(primary_key=True)
    typeid = models.ForeignKey(Type, models.DO_NOTHING, db_column='typeid', blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'type_anime'

class Director(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'director'


class DirectorAnime(models.Model):
    id = models.BigIntegerField(primary_key=True)
    directorid = models.ForeignKey(Director, models.DO_NOTHING, db_column='directorid', blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'director_anime'

class Author(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'author'


class AuthorAnime(models.Model):
    id = models.BigIntegerField(primary_key=True)
    authorid = models.ForeignKey(Author, models.DO_NOTHING, db_column='authorid', blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'author_anime'

class AnimeCharacter(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'anime_character'
class AnimeEspisode(models.Model):
    id = models.BigIntegerField(primary_key=True)
    espisode = models.BigIntegerField(blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)
    dateup = models.DateField(blank=True, null=True)
    isdeleted = models.BooleanField(blank=True, null=True)
    time = models.FloatField(blank=True, null=True)
    video = models.CharField(max_length=400, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'anime_espisode'
class AnimeName(models.Model):
    id = models.BigIntegerField(primary_key=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    status = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'anime_name'

class FollowAnime(models.Model):
    id = models.BigIntegerField(primary_key=True)
    userid = models.ForeignKey(Users, models.DO_NOTHING, db_column='userid', blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)
    datefollow = models.DateField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'follow_anime'


