from django.db import models


class Role(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'role'

class Users(models.Model):
    id = models.BigIntegerField(primary_key=True)
    roleid = models.ForeignKey(Role, models.DO_NOTHING, db_column='roleid', blank=True, null=True)  
    name = models.CharField(max_length=50, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    username = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    password = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    createdate = models.DateField(blank=True, null=True)
    isdeleted = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'users'
