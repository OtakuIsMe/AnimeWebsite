from rest_framework import serializers
from .models import Rating, Comments

class RatingSerializers (serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
       
class CommentsSerializers (serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__' 
        