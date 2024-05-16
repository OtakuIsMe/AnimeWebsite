from rest_framework import serializers
from .models import Users, Role

class UsersSerializer (serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
class RoleSerializer (serializers.ModelSerializer):
    class Meta: 
        model = Role
        fields = '__all__'