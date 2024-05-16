from django.db import models
from anime.models import Anime, AnimeCharacter, AnimeEspisode
from users.models import Users
from comment_rating.models import Comments
# Create your models here.
class Images(models.Model):
    id = models.BigIntegerField(primary_key=True)
    userid = models.ForeignKey(Users, models.DO_NOTHING, db_column='userid', blank=True, null=True)
    animeid = models.ForeignKey(Anime, models.DO_NOTHING, db_column='animeid', blank=True, null=True)
    characterid = models.ForeignKey(AnimeCharacter, models.DO_NOTHING, db_column='characterid', blank=True, null=True)
    commentid = models.ForeignKey(Comments, models.DO_NOTHING, db_column='commentid', blank=True, null=True)
    category = models.CharField(max_length=50, blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    espisodeid = models.ForeignKey(AnimeEspisode, models.DO_NOTHING, db_column='espisodeid', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'images'