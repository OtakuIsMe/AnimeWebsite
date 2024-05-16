from django.db import models
from anime.models import Anime
from users.models import Users

class Rating(models.Model):
    id = models.BigIntegerField(primary_key=True)
    userid = models.ForeignKey(Users, models.DO_NOTHING, db_column='userid', blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING,related_name='rating_animeid', db_column='animeid', blank=True, null=True)
    rating = models.BigIntegerField(blank=True, null=True)
    daterate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rating'

class Comments(models.Model):
    id = models.BigIntegerField(primary_key=True)
    userid = models.ForeignKey(Users, models.DO_NOTHING, db_column='userid', blank=True, null=True)
    message = models.CharField(max_length=1000, blank=True, null=True)
    emotion = models.CharField(max_length=50, blank=True, null=True)
    dateup = models.DateField(blank=True, null=True)
    commentid = models.ForeignKey('self', models.DO_NOTHING, db_column='commentid', blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    ratingid = models.ForeignKey(Rating, models.DO_NOTHING, db_column='ratingid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments'